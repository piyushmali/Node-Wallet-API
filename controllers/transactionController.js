import User from '../models/user.js';
import Transaction from '../models/transaction.js';
import sendEmail from '../config/sendEmail.js';

export const transfer = async (req, res) => {
  try {
    const { receiver, amount, sender } = req.body;
    const recipient = await User.findOne({ email: receiver });
    const senderUser = await User.findOne({ email: sender });

    if (!recipient || !senderUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (senderUser.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    senderUser.balance -= amount;
    recipient.balance += amount;

    await senderUser.save();
    await recipient.save();

    const transaction = new Transaction({ sender: senderUser._id, receiver: recipient._id, amount });
    await transaction.save();

    await sendEmail(senderUser.email, 'Transaction Successful', `You have successfully transferred ${amount} to ${recipient.email}`);
    await sendEmail(recipient.email, 'Transaction Successful', `You have received ${amount} from ${senderUser.email}`);

    res.status(200).json({ message: 'Transfer successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const transactionHistory = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      $or: [{ sender: req.user._id }, { receiver: req.user._id }],
    }).populate('sender', 'email').populate('receiver', 'email');
    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
