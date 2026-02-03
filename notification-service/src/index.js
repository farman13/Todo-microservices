import dotenv from 'dotenv';
dotenv.config();
import amqplib from 'amqplib';
let channel, connection;

async function start() {
    try {
        connection = await amqplib.connect(process.env.RABBITMQ_URL);
        channel = await connection.createChannel();
        await channel.assertQueue('todo');
        console.log("Notification Service connected to task queue");
        channel.consume('todo', (msg) => {
            if (msg !== null) {
                const taskContent = JSON.parse(msg.content.toString());
                console.log("Received new task notification:", taskContent);
                channel.ack(msg);
            }
        });
    }
    catch (error) {
        console.error("Failed to connect with RabbitMQ", error);
    }
}

start();