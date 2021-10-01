# TextChess_MS

TextChess on Microservice architecture

# Setup Instructions

## Local Machine

1. You need have rabbitmq server running on your local machine
2. UserMoveHandler is running on port 3000
3. EngineMoveHandler is running on port 7000
4. make sure config files has as values given below
5. Run start_localhost.bat

### Client

**CLIENT/code/config.js**

const config = {
userMoveHandlerURL: "http://localhost:3000/",
engineMoveHandlerURL: "http://localhost:7000/",
};

### EngineMoveHandler

**EngineMoveHandler/CONFIG/config.js**

config = {};
config.expressPort = 7000;
config.rabbitMqServer = "amqp://localhost";
config.queueName = "engine-user";
module.exports.config = config;

### UserMoveHandler

**UserMoveHandler/CONFIG/config.js**

config = {};
config.expressPort = 3000;
config.rabbitMqServer = "amqp://localhost";
config.queueName = "user-engine";
module.exports.config = config;

### ENGINE

**ENGINE/CONFIG/config.js**

config = {};
config.rabbitMqServer = "amqp://localhost";
config.receiverQueueName = "user-engine";
config.senderQueueName = "engine-user";
module.exports.config = config;
