config = {};

config.expressPort = 3000;
config.rabbitMqServer = "amqp://rabbitmq:5672";
config.queueName = "user-engine";

module.exports.config = config;
