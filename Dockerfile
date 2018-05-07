FROM node:alpine
LABEL maintainer="andrew.j.smith.jr@gmail.com"
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY .babelrc /usr/src/app
COPY webpack.config.js /usr/src/app
COPY src /usr/src/app/src
RUN npm i

EXPOSE [3000]
CMD ["npm", "run", "start-dev"]