import User from '../models/user.js';

const checkAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user && user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ status: 'failed', message: 'Access Denied' });
    }
  } catch (error) {
    console.error('Admin check error:', error);
    res.status(500).json({ status: 'failed', message: 'Server Error' });
  }
};

export default checkAdmin;
