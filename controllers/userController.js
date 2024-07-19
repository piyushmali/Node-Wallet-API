import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sendEmail from '../config/sendEmail.js';

export const userRegistration = async (req, res) => {
<<<<<<< HEAD
  const { name, email, password, tc } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      tc,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Server error' });
=======
  const { name, email, password, password_confirmation, tc } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ status: 'failed', message: 'Email already exists' });
    }

    if (name && email && password && password_confirmation && tc) {
      if (password === password_confirmation) {
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
      } else {
        res.status(400).json({ status: 'failed', message: "Password and Confirm Password don't match" });
      }
    } else {
      res.status(400).json({ status: 'failed', message: 'All fields are required' });
    }
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ status: 'failed', message: 'Unable to Register' });
>>>>>>> 91437f2a74a9e48c8005fec50b89e2904b1f02c5
  }
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
<<<<<<< HEAD
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Server error' });
=======
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
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ status: 'failed', message: 'Unable to Login' });
>>>>>>> 91437f2a74a9e48c8005fec50b89e2904b1f02c5
  }
};

export const loggedUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching logged user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const setAdmin = async (req, res) => {
  try {
    const { email, isAdmin } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.isAdmin = isAdmin;
    await user.save();
    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error('Error setting admin:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
