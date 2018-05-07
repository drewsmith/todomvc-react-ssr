todomvc-react-ssr
===
Yet another [TodoMVC](http://todomvc.com) implementation (YATMI) using express to render service side React. Storage is provided via LocalStorage.

## Usage

```
npm i
npm run start-dev
```

![TodoMVC](todomvc.png)

##

For convenience, there is also a `Dockerfile` for running the app in a container:

```
chmod +x docker.sh && ./docker.sh

> docker ps
CONTAINER ID        IMAGE                                                            COMMAND                  CREATED             STATUS             PORTS                                              NAMES
fca08d9ae1fd        todomvc                                                          "npm run start-dev"      1 second ago        Up 2 seconds        0.0.0.0:3333->3000/tcp                             TodoMVC
```