import express from 'express';
import { createUser, fetchUsers } from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.post('/register', createUser);
userRouter.get('/getUsers', fetchUsers);

export default userRouter;