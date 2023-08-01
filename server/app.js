import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import userRoutes from "./routes/user-routes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/user', userRoutes);
const PORT = 3001;

mongoose.connect('mongodb://localhost:27017/testdb')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });
