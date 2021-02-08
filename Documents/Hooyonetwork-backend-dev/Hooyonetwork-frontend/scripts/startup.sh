docker build -t hooyosnetwork-app .
docker run -d --name 'hooyosnetwork-app' --rm -p 80:3000 hooyosnetwork-app