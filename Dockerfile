
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

<<<<<<< HEAD

EXPOSE 8080
=======
EXPOSE 8084
>>>>>>> 3ecb5e7db9640b55feaee873fdb90cefa0d1d41c


CMD ["nginx", "-g", "daemon off;"]

