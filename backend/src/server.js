import express from 'express';
import taskRoute from './routes/taskRouters.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

// middleware
app.use(express.json());
//to make sure that front can send request to back in dev
app.use(cors({ origin: ['http://localhost:5173', ] }));

// routers
app.use('/api/tasks', taskRoute);

const PORT = process.env.PORT || 3003;
connectDB().then(() => {	// connect to DB before open PORT
  app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
  });
});


