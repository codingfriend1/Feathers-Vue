FROM gzlock/node-pm2

################## ESTABLISH DIRECTORIES ######################
RUN rm -rf /var/www/
WORKDIR /var/www/
COPY package.json /var/www/
ENV NODE_ENV=production
RUN npm install
COPY public/ /var/www/public
COPY server/ /var/www/server
COPY config/ /var/www/config
COPY certs/ /var/www/certs
# RUN chmod -R 755 /var/www
################## END DIRECTORIES ######################

# Expose the default port
EXPOSE 80
VOLUME /var/www

CMD ["pm2", "start", "server", "--no-daemon"]
