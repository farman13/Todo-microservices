import User from '../models/user.model.js';
import ApiError from '../utils/ApiError.js';

import AsyncHandler from '../utils/AsyncHandler.js';

const createUser = AsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new ApiError(400, "User with this email already exists");
    }

    const user = await User.create({ name, email, password });
    res.status(201).json(new ApiResponse(201, user, "User created successfully"));
});

const fetchUsers = AsyncHandler(async (req, res) => {
    const users = await User.find();
    res.status(200).json(new ApiResponse(200, users, "Users fetched successfully"));
});

export { createUser, fetchUsers };