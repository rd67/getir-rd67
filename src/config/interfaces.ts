import { Request } from "express";

export type IEnvEnvironment = "production" | "development" | "test";

interface IAppConfig {
  isProduction: boolean;
  environment: IEnvEnvironment;
  name: string;
  port: number;
  secretKey: string;
  baseURL: string;
}

export interface IOtherConfig {
  swagger: boolean;
}

export interface IDbConfig {
  url: string;
}

export interface IConfig {
  app: IAppConfig;

  other: IOtherConfig;

  db: IDbConfig;
}

export type ExpressRequest = Request & {
  reqId: string;
};
