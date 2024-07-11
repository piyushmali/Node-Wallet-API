import mongoose from 'mongoose';

mongoose.set('strictQuery', true); // Set strictQuery to true to suppress the warning

async function connectToMongoDB(uri) {
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
    throw error; // Rethrow the error to handle it in the caller
  }
}

export { connectToMongoDB };
