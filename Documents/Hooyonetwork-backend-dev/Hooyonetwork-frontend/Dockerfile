FROM node:14-alpine
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./

RUN npm ci --silent

COPY . .
RUN npm run build

EXPOSE 3000
RUN npm install http-server -g --silent
CMD http-server ./build -p 3000 -P http://127.0.0.1:3000\? -c-1 