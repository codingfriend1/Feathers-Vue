# FROM gzlock/node-pm2
FROM node:latest

################## ESTABLISH DIRECTORIES ######################

# Establish our webfolder root
RUN rm -rf /var/www/
WORKDIR /var/www/
COPY package.json /var/www/


# Install and cache npm dependencies unless package.json changes

ENV NODE_ENV=production
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN cp -a /tmp/node_modules /var/www/

COPY public/ /var/www/public
COPY server/ /var/www/server
COPY config/ /var/www/config
################## END DIRECTORIES ######################

# Expose the default port
EXPOSE 80
VOLUME /var/www

CMD ["npm", "start"]
