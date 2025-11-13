# Simple static server using nginx
FROM nginx:alpine

# Copy site into default nginx web root
COPY public/ /usr/share/nginx/html/

# Basic security headers (optional)
RUN printf 'add_header X-Content-Type-Options nosniff always;\nadd_header X-Frame-Options SAMEORIGIN always;\nadd_header X-XSS-Protection "1; mode=block" always;\n' > /etc/nginx/conf.d/headers.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]