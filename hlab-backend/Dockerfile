FROM node:20

WORKDIR /app

ENV TZ="Asia/Bangkok"

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build
