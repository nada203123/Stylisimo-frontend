
FROM node:18-alpine as build


WORKDIR /app


RUN npm install -g @angular/cli


COPY package*.json ./


RUN npm install


COPY . .


RUN ng build --configuration production


FROM nginx:alpine


COPY --from=build /app/dist/stylisimo-frontend /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf



EXPOSE 8084



CMD ["nginx", "-g", "daemon off;"]

