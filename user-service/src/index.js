import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import connectDB from "./db/index.js";

console.log("process.env.MONGO_URI", process.env.MONGO_URI);
connectDB()
    .then(() => {
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`User Service running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Failed to start server:", error);
    });