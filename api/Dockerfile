FROM node:latest

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY crud/package.json /usr/src/app/

RUN npm install

RUN npm install -g nodemon

COPY crud/ /usr/src/app

EXPOSE 3000

CMD ["npm", "start"]