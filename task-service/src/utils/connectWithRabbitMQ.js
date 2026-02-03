import amqplib from 'amqplib';
let channel, connection;

export const connectWithRabbitMQ = async (retries = 5, delay = 3000) => {
    while (retries) {
        try {
            connection = await amqplib.connect(process.env.RABBITMQ_URL);
            channel = await connection.createChannel();
            await channel.assertQueue('todo');
            console.log("Connected to RabbitMQ");
            return;
        }
        catch (error) {
            console.error("Failed to connect with RabbitMQ", error);
            retries -= 1;
            console.log(`Retries left: ${retries}`);
            await new Promise(res => setTimeout(res, delay));
        }
    }
};

export const sendMessageToQueue = async (message) => {
    if (!channel) {
        throw new Error("RabbitMQ channel is not established");
    }
    channel.sendToQueue('todo', Buffer.from(JSON.stringify(message)));
};