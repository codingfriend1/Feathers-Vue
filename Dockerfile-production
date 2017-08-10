FROM node:8-alpine
RUN apk add --update git && rm -rf /tmp/* /var/cache/apk/*

WORKDIR /var/www/
COPY package.json /var/www/

ENV NODE_ENV=production
COPY package.json /var/www/package.json
RUN npm install

COPY public/ /var/www/public
COPY config/ /var/www/config
COPY server/ /var/www/server

EXPOSE 80

CMD ["npm", "run", "production"]
