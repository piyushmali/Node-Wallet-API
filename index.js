import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { connectToMongoDB } from './config/connect.js';
import userRoutes from './routes/userRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';

const app = express();
const port = process.env.PORT || 3000;
const DATABASE_URL = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/transactions', transactionRoutes);

connectToMongoDB(DATABASE_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
