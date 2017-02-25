FROM nginx

RUN rm -f /etc/nginx/nginx.conf
COPY ./nginx.conf /etc/nginx/

RUN rm -rf /etc/nginx/conf.d/*
WORKDIR /etc/nginx/conf.d/
COPY ./conf.d/ /etc/nginx/conf.d/

RUN ln -sf /dev/stdout /var/log/nginx/access.log
RUN ln -sf /dev/stderr /var/log/nginx/error.log
