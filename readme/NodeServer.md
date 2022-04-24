## NodeJS Server

An application built with Express, TypeScript, Mongoose

## Setup

#### Setup Docker Environment

- [Using Docker](https://github.com/rd67/getir-rd67/tree/master/readme/Docker.md)

#### Setup .env

After cloning this repo, make sure you have `duplicated` the `.env.example` file to `.env`, don't let the .env.example file be deleted or renamed.

#### Ports for Different Environments

`development` -> 8000
`test` -> 8001
`production` -> 8005

When running this application, by default set the development mode. you can set the database configuration in `.env`, like this :

```sh
NODE_ENV=development
APP_NAME=getir-rd67
SECRET_KEY=bcr123r7y6QGe12342duoabcdeBXF786
BASE_URL="http://localhost:8000"
MONGO_URL="localhost:27017"
WAIT_HOSTS="getir-mongo:27017"
```

`BASE_URL` is the Server URL, Development: http://localhost:8000, Production: https://getir-rd67.herokuapp.com
`MONGO_URL` is the Mongo DB URL
`SECRET_KEY` should be randomly generated string of length 32
`WAIT_HOSTS` is to make sure when using docker the backend container waits for the local db to get started, not required for production environment.

#### Terminal Commands

Development: Command starts the server with nodemon

```sh
npm run dev
```

Production: Command starts the server from the build

```sh
npm run start
```

Production Build : Make build using following command

```sh
npm run build
```

Clean: Removes the build folder

```sh
npm run clean
```

Test: Runs the Test **Note: Server needs to be runing to run the tests**

```sh
npm run test
```

Format: Formats the code

```sh
npm run format
```

## Api Documentation

### Api Swagger OpenApi JSON

    Link = ${BASE_URL}/v1/api-docs.json

### Api Swagger UI

    Link = ${BASE_URL}/v1/api-docs

### Api Postman

    Link = https://documenter.getpostman.com/view/154248/UyrBhvHa

    Select the respective Environment, and verify that the parameter GETIR_SERVER is properly set.
