FROM node:16.8.0

LABEL authors="Rohit Dalal<rohitdalal67@gmail.com>"

WORKDIR /app

#Installed nano, just in case need to ssh to container to edit some file
RUN ["apt-get", "update"]
RUN ["apt-get", "install", "-y", "nano"]

# Set config npm & install dependencies
RUN npm install -g typescript ts-node

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 8005

CMD npm start
