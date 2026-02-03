import express from 'express';
import { createTask, fetchTasks } from '../controllers/task.controller.js';


const taskRouter = express.Router();

taskRouter.post('/create', createTask);
taskRouter.get('/getTasks', fetchTasks);

export default taskRouter;