FROM gzlock/node-pm2

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

COPY www/ /var/www/www
COPY server/ /var/www/server
COPY config/ /var/www/config
# RUN chmod -R 755 /var/www
################## END DIRECTORIES ######################

# Expose the default port
EXPOSE 80
VOLUME /var/www

CMD ["pm2", "start", "server", "--no-daemon"]
