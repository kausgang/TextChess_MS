config = {};

config.rabbitMqServer = "amqp://rabbitmq:5672";
config.receiverQueueName = "user-engine";
config.senderQueueName = "engine-user";

module.exports.config = config;
