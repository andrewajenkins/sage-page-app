# Use the official Nginx image as a parent image
FROM nginx:latest

# Remove the default Nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf || true

# Copy the custom configuration file from the host to the container
COPY nginx.prod.conf /etc/nginx/nginx.conf

# Expose port 80 to the host
EXPOSE 80
