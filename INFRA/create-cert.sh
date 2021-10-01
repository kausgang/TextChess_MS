# NGINX certificate create
rm ../CLIENT/cert/nginx.*
openssl req -x509 -config ssl_config.conf -nodes -days 365 -newkey rsa:2048 -keyout ../CLIENT/cert/nginx.key -out ../CLIENT/cert/nginx.crt