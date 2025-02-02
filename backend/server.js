import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';  // Adjust this file to connect to MongoDB
import userRoutes from './routes/userRoutes.js';
import 'dotenv/config';

//connect to db
connectDB();

//api config
const app = express();
const PORT = process.env.PORT || 5000;

//api endpoints
app.use(express.json());
app.use('/user', userRoutes);
app.get('/', (req, res) => res.send('API is running...'));

//server running
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});