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

_CLIENT/code/config.js_

    const config = {
    userMoveHandlerURL: "http://localhost:3000/",
    engineMoveHandlerURL: "http://localhost:7000/",
    };

### EngineMoveHandler

_EngineMoveHandler/CONFIG/config.js_

config = {};
config.expressPort = 7000;
config.rabbitMqServer = "amqp://localhost";
config.queueName = "engine-user";
module.exports.config = config;

### UserMoveHandler

_UserMoveHandler/CONFIG/config.js_

config = {};
config.expressPort = 3000;
config.rabbitMqServer = "amqp://localhost";
config.queueName = "user-engine";
module.exports.config = config;

### ENGINE

_ENGINE/CONFIG/config.js_

config = {};
config.rabbitMqServer = "amqp://localhost";
config.receiverQueueName = "user-engine";
config.senderQueueName = "engine-user";
module.exports.config = config;
