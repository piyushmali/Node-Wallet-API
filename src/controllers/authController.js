import bcrypt from 'bcryptjs';
import jwt from '../utils/jwt.js';
import User from '../models/user.js';
import mailer from '../utils/mailer.js';

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    user = new User({
      email,
      password: await bcrypt.hash(password, 10),
      balance: 10000 // Fake balance on signup
    });
    await user.save();

    // Send verification email
    const token = jwt.sign({ userId: user._id });
    const verificationLink = `http://localhost:3000/api/auth/verify-email?token=${token}`;
    await mailer.sendEmail(email, 'Verify your email', verificationLink);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    const decoded = jwt.verify(token);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(400).json({ message: 'Invalid token' });
    }

    user.isVerified = true;
    await user.save();

    res.status(200).json({ message: 'Email verified successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const login = async (req, res) => {
  try {
    const { email, password, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (password) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
    } else if (otp) {
      // Add OTP validation logic here
    }

    const token = jwt.sign({ userId: user._id });
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export { signup, verifyEmail, login };
