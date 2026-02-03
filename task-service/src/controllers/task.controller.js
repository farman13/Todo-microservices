import Task from '../models/task.model.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import AsyncHandler from '../utils/AsyncHandler.js';
import { sendMessageToQueue } from '../utils/connectWithRabbitMQ.js';

const createTask = AsyncHandler(async (req, res) => {
    const { title, description, userId } = req.body;
    if (!title || !description || !userId) {
        throw new ApiError(400, "Title, Description, and User ID are required");
    }
    const newTask = await Task.create({ title, description, userId });
    await newTask.save();

    const message = {
        taskId: newTask._id,
        title: newTask.title,
        description: newTask.description,
        status: newTask.status,
        userId: newTask.userId
    };

    await sendMessageToQueue(message);
    res.status(201).json(new ApiResponse(201, newTask, "Task created successfully"));
});

const fetchTasks = AsyncHandler(async (req, res) => {
    const { userId } = req.query;
    const tasks = await Task.find({ userId });
    res.status(200).json(new ApiResponse(200, tasks, "Tasks fetched successfully"));
});

export { createTask, fetchTasks };