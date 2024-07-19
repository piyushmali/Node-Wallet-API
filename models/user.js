import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true, trim: true },
  tc: { type: Boolean, required: true },
  balance: { type: Number, default: 1000 },
<<<<<<< HEAD
  isAdmin: { type: Boolean, default: false },
=======
  role: { type: String, default: 'user' }  // Add role field
>>>>>>> 91437f2a74a9e48c8005fec50b89e2904b1f02c5
});

const User = mongoose.model('User', userSchema);

export default User;
