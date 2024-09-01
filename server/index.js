import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './db/connect.js';
import userRouter from './routes/userRoute.js';
import logger from './logger.js';
import chatRouter from './routes/chatRoute.js';
import messageRouter from './routes/messageRoute.js';
import authenticateToken from './utils/verify.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

connectDB();

app.use((req, res, next) => {  
  logger.info(`${req.method} ${req.url}`);  
  next();  
});

app.use('/api/users', userRouter);

//verify token: only below routes are protected
app.use(authenticateToken);

app.use('/api/chats', chatRouter);
app.use('/api/messages', messageRouter);

app.get('/health', (req, res) => {
  res.status(200).send('Server is running');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});