import express from 'express';
import cors from 'cors';
import taskRouter from './routes/task.routes.js';


const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/v1/tasks', taskRouter);

export default app;