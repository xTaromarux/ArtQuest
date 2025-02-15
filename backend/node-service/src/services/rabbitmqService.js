const amqplib = require('amqplib');

module.exports = {
  sendToQueue: async (queue, message) => {
    try {
      const connection = await amqplib.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
      const channel = await connection.createChannel();
      await channel.assertQueue(queue, { durable: true });
      channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
      setTimeout(() => {
        channel.close();
        connection.close();
      }, 500);
    } catch (error) {
      console.error('RabbitMQ error:', error);
    }
  }
};
