import mongoose from 'mongoose';
import dotenv from 'dotenv';

<<<<<<< HEAD
const connectDB = async () => {
=======
dotenv.config();

mongoose.set('strictQuery', true);

async function connectToMongoDB() {
  const uri = process.env.MONGODB_URI;
>>>>>>> 91437f2a74a9e48c8005fec50b89e2904b1f02c5
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
<<<<<<< HEAD
    console.error('MongoDB connection error:', error);
    process.exit(1);
=======
    console.error('Error connecting to MongoDB:', error.message);
    throw error;
>>>>>>> 91437f2a74a9e48c8005fec50b89e2904b1f02c5
  }
};

export default connectDB;
