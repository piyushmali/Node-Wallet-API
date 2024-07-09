import User from '../models/user.js';
import Transaction from '../models/transaction.js';
import mailer from '../utils/mailer.js';

const transfer = async (req, res) => {
  try {
    const { recipientEmail, amount } = req.body;
    const sender = req.user;
    const recipient = await User.findOne({ email: recipientEmail });

    if (!recipient) {
      return res.status(404).json({ message: 'Recipient not found' });
    }

    if (sender.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    sender.balance -= amount;
    recipient.balance += amount;

    await sender.save();
    await recipient.save();

    const transaction = new Transaction({
      sender: sender._id,
      recipient: recipient._id,
      amount,
    });
    await transaction.save();

    await mailer.sendEmail(
      sender.email,
      'Transaction Successful',
      `You have successfully transferred ${amount} to ${recipientEmail}`
    );

    await mailer.sendEmail(
      recipient.email,
      'Transaction Successful',
      `You have received ${amount} from ${sender.email}`
    );

    res.status(200).json({ message: 'Transfer successful' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const transactionHistory = async (req, res) => {
  try {
    const user = req.user;
    const transactions = await Transaction.find({
      $or: [{ sender: user._id }, { recipient: user._id }],
    }).populate('sender recipient', 'email');

    res.json(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export { transfer, transactionHistory };
