import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sendEmail from '../config/sendEmail.js';

export const userRegistration = async (req, res) => {
  const { name, email, password, password_confirmation, tc } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.status(400).json({ status: 'failed', message: 'Email already exists' });
  } else {
    if (name && email && password && password_confirmation && tc) {
      if (password === password_confirmation) {
        try {
          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(password, salt);
          const newUser = new User({ name, email, password: hashPassword, tc });
          await newUser.save();
          const token = jwt.sign({ userID: newUser._id }, process.env.JWT_SECRET, { expiresIn: '5d' });

          const emailSubject = 'Welcome to Our App!';
          const emailText = `Hello ${name},\n\nThank you for registering. We're excited to have you on board!\n\nBest regards,\nThe Team`;

          try {
            await sendEmail(email, emailSubject, emailText);
            res.status(201).json({ status: 'success', message: 'Registration Success', token });
          } catch (emailError) {
            console.error('Error sending email:', emailError);
            res.status(201).json({ status: 'success', message: 'Registration Success, but failed to send email', token });
          }
        } catch (error) {
          console.error(error);
          res.status(500).json({ status: 'failed', message: 'Unable to Register' });
        }
      } else {
        res.status(400).json({ status: 'failed', message: "Password and Confirm Password don't match" });
      }
    } else {
      res.status(400).json({ status: 'failed', message: 'All fields are required' });
    }
  }
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET, { expiresIn: '5d' });
      res.status(200).json({ status: 'success', message: 'Login Success', token });
    } else {
      res.status(400).json({ status: 'failed', message: 'Invalid email or password' });
    }
  } else {
    res.status(400).json({ status: 'failed', message: 'All fields are required' });
  }
};

export const loggedUser = async (req, res) => {
  res.status(200).json({ user: req.user });
};
