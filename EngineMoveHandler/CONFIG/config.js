config = {};

config.expressPort = 7000;
config.rabbitMqServer = "amqp://rabbitmq:5672";
config.queueName = "engine-user";

module.exports.config = config;
