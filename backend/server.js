import express from 'express';
import connectDB from './config/db.js';  // Adjust this file to connect to MongoDB
import userRoutes from './routes/userRoutes.js';
import 'dotenv/config';
import partyRoutes from "./routes/partyRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import voteRoutes from "./routes/voteRoutes.js"

import cors from 'cors';
//connect to db
connectDB();

//api config
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;
app.use(cors({
  origin: '*', // Your frontend URL
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
}));
app.use("/uploads", express.static("uploads"));

//api endpoints

app.use('/user', userRoutes);
app.use("/parties", partyRoutes);
app.use("/admin", adminRoutes);
app.use("/api", voteRoutes);

app.get('/', (req, res) => res.send('API is running...'));

//server running
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});