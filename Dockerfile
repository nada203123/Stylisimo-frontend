
FROM node:18-alpine as build


WORKDIR /app


RUN npm install -g @angular/cli


COPY package*.json ./


RUN npm install


COPY . .


RUN ng build --configuration production


FROM nginx:alpine


COPY --from=build /app/dist/stylisimo-frontend/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/sites-available/my-apps
# Enable the site by creating a symlink in sites-enabled
RUN ln -s /etc/nginx/sites-available/my-apps /etc/nginx/sites-enabled/

# Remove the default configuration if needed
RUN rm /etc/nginx/conf.d/default.conf



EXPOSE 80



CMD ["nginx", "-g", "daemon off;"]

