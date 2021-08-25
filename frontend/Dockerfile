FROM nginx

WORKDIR /usr/src/app

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d/

COPY build build

CMD nginx -g 'daemon off;'
