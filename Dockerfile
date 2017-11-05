FROM node:8-alpine
RUN apk add --update bash && rm -rf /var/cache/apk/*
RUN apk add --update git && rm -rf /tmp/* /var/cache/apk/*

WORKDIR /var/www/

ENV NODE_ENV=development
COPY package.json /var/www/package.json
RUN npm install

COPY . /var/www

EXPOSE 3030
VOLUME /var/www

CMD ["npm", "run", "dev"]
