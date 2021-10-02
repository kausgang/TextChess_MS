# TextChess_MS

TextChess on Microservice architecture

# Setup Instructions

## 1. Everything on Local Machine

1.  You need have rabbitmq server running on your local machine. This application has been tested on Node version v14.15.4.
2.  UserMoveHandler runs on port 3000 by default.
3.  EngineMoveHandler runs on port 7000 by default.
4.  make sure config files has values as given below -
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

1. [Create self-sign certificates](<#create-self-signed-certificate-for-nginx-web-server-(client)>)

Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Pellentesque ut urna massa. Aliquam ut nisi maximus, consectetur velit quis, pharetra nulla. Donec aliquet,
quam a tristique vulputate, purus diam convallis ante, id consectetur lectus velit nec tellus. Pellentesque
habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer fermentum
scelerisque diam, sit amet convallis erat vestibulum eget. Donec euismod eget purus ut euismod. Vivamus
ullamcorper fringilla tempus. Morbi at elementum nisi, nec eleifend turpis. Integer eget volutpat justo, sit
amet scelerisque orci. Proin consectetur in leo ac vestibulum. Sed diam urna, varius non lacus ut, blandit
imperdiet leo. Vestibulum lobortis mattis venenatis.

Praesent vestibulum metus sed dapibus gravida. Nunc interdum tortor a diam pellentesque suscipit. Pellentesque
placerat massa arcu. Sed non viverra risus, et venenatis leo. Vivamus consectetur odio non magna luctus, at
sollicitudin urna placerat. Fusce mattis, enim quis lacinia volutpat, leo justo tincidunt tortor, ac tincidunt
elit ligula a libero. Proin euismod consequat massa ut facilisis.

Pellentesque laoreet, est ut maximus dignissim, augue orci suscipit magna, vel facilisis arcu enim non justo.
Nullam semper dictum est, fermentum euismod nisi sagittis vel. Vestibulum ante ipsum primis in faucibus orci
luctus et ultrices posuere cubilia curae; Vestibulum at tincidunt leo, in bibendum urna. Quisque egestas nisi
at purus sagittis venenatis. Vivamus quis commodo mi, et sodales justo. Praesent eros ante, commodo eu
tincidunt quis, tempor non purus. Aliquam erat volutpat. Suspendisse accumsan eu magna et luctus. Curabitur et
lobortis ante, quis tincidunt urna. Proin ligula justo, eleifend quis odio ac, elementum semper quam.
Curabitur dignissim sapien risus, sit amet sollicitudin urna auctor vitae. Maecenas suscipit elit cursus,
laoreet ligula ut, luctus lectus. Quisque ac risus at eros aliquam fringilla ut sed neque. Integer luctus et
metus at rutrum.

Fusce at massa purus. Aliquam viverra quam sed elementum consequat. Aenean augue sem, efficitur eget magna nec, porta accumsan tortor. Donec sollicitudin purus eu nibh imperdiet porttitor. Morbi semper interdum dui, et ultrices nulla porttitor sit amet. Vivamus quis ante urna. Curabitur at orci lorem. Morbi vehicula velit a placerat dapibus. Duis faucibus augue eget turpis malesuada rhoncus.

Praesent elementum, sapien sed mollis dignissim, ipsum neque fermentum lacus, at aliquam lectus turpis sed magna. Vestibulum in rutrum ligula, in imperdiet massa. Nunc et imperdiet neque. Nunc aliquet diam eget est sodales fringilla. Pellentesque ut nibh metus. Etiam luctus mi at massa bibendum, ut pharetra metus fringilla. Proin sed maximus leo. Cras semper ac dolor ac aliquet. Morbi id nibh maximus enim imperdiet tristique at ac elit. Nam fermentum sapien id ligula convallis, vel rhoncus diam viverra. Phasellus accumsan ligula accumsan imperdiet faucibus. Quisque vehicula mi non iaculis accumsan. Maecenas semper condimentum interdum. Cras vel felis rutrum, tempor velit eu, ornare tellus.

## Supporting scripts

### Create self-signed certificate for NGINX web server (CLIENT)

The certificates (nginx.key,nginx.crt) will be placed inside CLIENT/cert. This requires **openssl**

    run create-cert-nginx.sh
