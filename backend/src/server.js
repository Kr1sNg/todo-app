import express from 'express';
import taskRoute from './routes/taskRouters.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());	//middleware
app.use("/api/tasks", taskRoute);

const PORT = process.env.PORT || 3003;
connectDB().then(() => {	// connect to DB before open PORT
	app.listen(PORT, () => {
		console.log(`server running on port ${PORT}`);
	})
});


