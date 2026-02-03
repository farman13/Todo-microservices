import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import connectDB from "./db/index.js";

connectDB()
    .then(() => {
        const PORT = process.env.PORT || 3001;
        app.listen(PORT, () => {
            console.log(`Task Service running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Failed to start server:", error);
    });