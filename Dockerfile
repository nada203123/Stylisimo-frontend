
FROM node:18-alpine as build


WORKDIR /app


RUN npm install -g @angular/cli


COPY package*.json ./


RUN npm install


COPY . .


RUN ng build --prod


FROM nginx:alpine


COPY --from=build /app/dist/stylisimo-frontend /usr/share/nginx/html


EXPOSE 80


CMD ["nginx", "-g", "daemon off;"]

