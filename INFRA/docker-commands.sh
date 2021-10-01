cd ../CLIENT
docker build -t textchess-client .
docker run -p 1443:443 --name CLIENT-CONTAINER -d textchess-client

