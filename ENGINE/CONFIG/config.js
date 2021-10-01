config = {};

// config.expressPort = 7000;
config.rabbitMqServer = "amqp://localhost";
config.receiverQueueName = "user-engine";
config.senderQueueName = "engine-user";

module.exports.config = config;
