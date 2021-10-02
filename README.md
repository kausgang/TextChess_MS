# TextChess_MS

TextChess on Microservice architecture

# Setup Instructions

## 1. Everything on Local Machine

1.  You need have rabbitmq server running on your local machine. This application has been tested on Node version v14.15.4.
2.  UserMoveHandler runs on port 3000 by default.
3.  EngineMoveHandler runs on port 7000 by default.
4.  make sure config files have values as given below -
5.  Run _start_localhost.bat_
6.  It will open the application in google Chrome. If you don't have Chrome, update _start_localhost.bat_ and change _chrome_ to firefox or whatever you have.

    #### CLIENT

    _CLIENT/code/config.js_

         const config = {
         userMoveHandlerURL: "http://localhost:3000/",
         engineMoveHandlerURL: "http://localhost:7000/",
         };

    #### EngineMoveHandler

    _EngineMoveHandler/CONFIG/config.js_

         config = {};
         config.expressPort = 7000;
         config.rabbitMqServer = "amqp://localhost";
         config.queueName = "engine-user";
         module.exports.config = config;

    #### UserMoveHandler

    _UserMoveHandler/CONFIG/config.js_

         config = {};
         config.expressPort = 3000;
         config.rabbitMqServer = "amqp://localhost";
         config.queueName = "user-engine";
         module.exports.config = config;

    #### ENGINE

    _ENGINE/CONFIG/config.js_

         config = {};
         config.rabbitMqServer = "amqp://localhost";
         config.receiverQueueName = "user-engine";
         config.senderQueueName = "engine-user";
         module.exports.config = config;

## 2. RabbitMQ Docker Image

1.  You can run RabbitMq as a docker image and skip RabbitMQ installation on local machine.

        docker pull rabbitmq:3
        docker run -p 5672:5672 -d --hostname my-rabbit --name some-rabbit rabbitmq:3

2.  Update the config files below. For example, if docker is running on 192.168.1.214 on port 5672 (from above docker run command) the config file will have _config.rabbitMqServer = "amqp://192.168.1.214:5672";_

    #### EngineMoveHandler

    _EngineMoveHandler/CONFIG/config.js_

        config = {};
        config.expressPort = 7000;
        config.rabbitMqServer = "amqp://<dockerhost>";
        config.queueName = "engine-user";
        module.exports.config = config;

    #### UserMoveHandler

    _UserMoveHandler/CONFIG/config.js_

        config = {};
        config.expressPort = 3000;
        config.rabbitMqServer = "amqp://<dockerhost>";
        config.queueName = "user-engine";
        module.exports.config = config;

    #### ENGINE

    _ENGINE/CONFIG/config.js_

        config = {};
        config.rabbitMqServer = "amqp://<dockerhost>";
        config.receiverQueueName = "user-engine";
        config.senderQueueName = "engine-user";
        module.exports.config = config;

## 3. Deploy Client on NGINX web server (Docker Container)

1. HTTPS connection is required to avoid CSRF error.
2. Build docker image from Dockerfile provided inside CLIENT directory - it takes care of the self-sign certificate.
