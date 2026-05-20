FROM nginx:alpine

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy static website files to Nginx html directory
COPY . /usr/share/nginx/html/

# Remove unnecessary files from the web server container
RUN rm -rf /usr/share/nginx/html/Dockerfile \
           /usr/share/nginx/html/nginx.conf \
           /usr/share/nginx/html/.impeccable \
           /usr/share/nginx/html/*.md

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
