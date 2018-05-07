FROM node:alpine
LABEL maintainer="andrew.j.smith.jr@gmail.com"
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app/
RUN npm i

EXPOSE [3000]
CMD ["npm", "run", "start-dev"]