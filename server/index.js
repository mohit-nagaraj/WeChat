import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './db/connect.js';
import userRouter from './routes/userRoute.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// connectDB();

app.use('/api/users', userRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});