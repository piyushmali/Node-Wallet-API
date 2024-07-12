import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.set('strictQuery', true);

async function connectToMongoDB() {
  const uri = process.env.MONGODB_URI;
  try {
    if (!uri) {
      throw new Error('The MongoDB URI is not defined.');
    }
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    throw error;
  }
}

export { connectToMongoDB };
