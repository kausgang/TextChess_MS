FROM nginx:latest

COPY cert/default.conf /etc/nginx/conf.d/
COPY cert/nginx.crt /etc/ssl/
COPY cert/nginx.key /etc/ssl
COPY code/ /usr/share/nginx/html/
