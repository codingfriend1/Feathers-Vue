FROM codingfriend/meanbase

################## ESTABLISH DIRECTORIES ######################
RUN rm -rf /var/www/
WORKDIR /var/www/
COPY package.json /var/www/
ENV NODE_ENV=production
RUN npm install
COPY public/ /var/www/public
COPY src/ /var/www/src
COPY config/ /var/www/config
# RUN chmod -R 755 /var/www
################## END DIRECTORIES ######################

# Expose the default port
EXPOSE 3030
VOLUME /var/www

CMD ["pm2", "start", "src", "--no-daemon"]
