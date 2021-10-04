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

    #### EngineMoveHandler/UserMoveHandler/Engine

    _EngineMoveHandler/CONFIG/config.js_\
    _UserMoveHandler/CONFIG/config.js_\
    _ENGINE/CONFIG/config.js_

         ***
         config.rabbitMqServer = "amqp://localhost";
         ***

## 2. RabbitMQ Docker Image

1.  Alternatively you can run RabbitMq as a docker image and skip RabbitMQ installation on local machine. Run other microservices from local machine.

        docker pull rabbitmq:3-management
        docker run -p 5672:5672 -p 15672:15672 -d --hostname my-rabbit --name some-rabbit rabbitmq:3-management

2.  Update the config files below. For example, if docker is running on 192.168.1.214 on port 5672 (from above docker run command) the config file will have _config.rabbitMqServer = "amqp://192.168.1.214:5672";_

    #### EngineMoveHandler/UserMoveHandler/Engine

    _EngineMoveHandler/CONFIG/config.js_\
    _UserMoveHandler/CONFIG/config.js_\
    _ENGINE/CONFIG/config.js_

         ***
         config.rabbitMqServer = "amqp://<dockerhost>:5672";
         ***

## 3. RabbitMQ, UserMoveHandler, EngineMoveHandler, Engine as docker container

1. Client from local machine
2. RabbitMQ, UserMoveHandler, EngineMoveHandler and Engine as docker containers
3. Before building docker images, make sure the config values are correct

#### CLIENT

    _CLIENT/code/config.js_

         const config = {
        userMoveHandlerURL: "http://<dockerhost>:3000",
        engineMoveHandlerURL: "http://<dockerhost>:7000/",
        };

#### EngineMoveHandler/UserMoveHandler/Engine

    _EngineMoveHandler/CONFIG/config.js_\
    _UserMoveHandler/CONFIG/config.js_\
    _ENGINE/CONFIG/config.js_

         ***
         config.rabbitMqServer = "amqp://<dockerhost>:5672";
         ***

### Docker container startup order

RabbitMQ container takes time to startup. Since ENGINE and EngineMoveHandler opens connection to RabbitMQ at startup, docker-compose couldnot be used to start all containers together - as this required container startuo order is not provided by docker-compose.

Hence containers can be started manually. The RabbitMQ container has to be started before all other containers. The commands are given below.

    docker pull rabbitmq:3-management
    docker pull node:14.18

    # Run RabbitMQ first
    docker run -p 5672:5672 -p 15672:15672 -d --hostname my-rabbit rabbitmq:3-management

    # Wait for some time for RabbitMQ to startup
    # Start other containers

    cd ENGINE
    docker build -t engine .
    docker run -d engine

    cd EngineMoveHandler
    docker build -t engine-move-handler .
    docker run -p 7000:7000 -d engine-move-handler

    cd UserMoveHandler
    docker build -t user-move-handler .
    docker run -p 3000:3000 -d user-move-handler

## IF - Deploying Client on NGINX web server (Docker Container)

If you are containerising CLIENT microservice, consoder these

1. HTTPS connection is required to avoid CSRF error.
2. Build docker image from Dockerfile provided inside CLIENT directory - it takes care of the self-sign certificate.
3. If CLIENT is using SSl, EngineMoveHandler and UserMoveHandler have to use SSL too.
