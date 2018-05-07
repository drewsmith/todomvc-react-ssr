!#/bin/bash
echo "Cleaning up..."
docker stop TodoMVC && docker rm TodoMVC
echo "Building image..."
docker build -t todomvc .
docker run -d -p 3333:3000 --name TodoMVC todomvc
echo "TodoMVC is running: localhost:3333"