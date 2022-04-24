import dotenv from "dotenv";

import * as interfaces from "./interfaces";

dotenv.config();

const env = (process.env.NODE_ENV ||
  "development") as interfaces.IEnvEnvironment;

const BaseURL = process.env.BASE_URL as string;

//TODO: For future to use seperate env variables for each NODE_ENV
const dbConfig: interfaces.IDbConfig = {
  url: process.env.MONGO_URL as string,
};

const AppName = process.env.APP_NAME as string;

const SecretKey = process.env.SECRET_KEY as string;

const development: interfaces.IConfig = {
  app: {
    isProduction: false,
    environment: "development",
    name: AppName,
    port: 8000,
    secretKey: SecretKey,
    baseURL: BaseURL,
  },

  other: {
    swagger: true,
  },

  db: dbConfig,
};

const test: interfaces.IConfig = {
  app: {
    isProduction: false,
    environment: "test",
    name: AppName,
    port: 8001,
    secretKey: SecretKey,
    baseURL: BaseURL,
  },

  other: {
    swagger: false,
  },

  db: dbConfig,
};

const production: interfaces.IConfig = {
  app: {
    isProduction: true,
    environment: "production",
    name: AppName,
    port: process.env.PORT ? parseInt(process.env.PORT) : 8005,
    secretKey: SecretKey,
    baseURL: BaseURL,
  },
  other: {
    swagger: true,
  },

  db: dbConfig,
};

const config: Record<interfaces.IEnvEnvironment, interfaces.IConfig> = {
  development,
  test,
  production,
};

export default config[env];
