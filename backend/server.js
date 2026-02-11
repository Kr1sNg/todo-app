import express from 'express';
import taskRoute from './src/routes/taskRouters.js';
import { connectDB } from './src/config/db.js';
import dotenv from 'dotenv';
import { unknownEndpoint, distPath } from './src/config/middleware.js';

dotenv.config();

const app = express();
app.use(express.static(distPath));

// middleware
app.use(express.json());

// routers
app.use('/api/tasks', taskRoute);

// to go nowhere
app.use(unknownEndpoint);

const PORT = process.env.PORT || 3003;
connectDB().then(() => {	// connect to DB before open PORT
  app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
  });
});


