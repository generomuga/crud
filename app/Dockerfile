FROM node:latest

RUN npm install -g http-server

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY crud/package*.json /usr/src/app/

RUN npm install

COPY crud/ /usr/src/app

RUN npm run build

EXPOSE 8080

CMD [ "http-server", "dist" ]