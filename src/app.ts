import express, { Application } from "express";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import hpp from "hpp";
import chalk from "chalk";

import config from "@config/config";
import { connectMongoDb } from "@models/index";

import { i18n, httpLogger, swagger } from "@packages/index";

import {
  RequestHandler,
  RouteNotFoundHandler,
  ErrorHandler,
} from "@middlewares/index";

import v1Routes from "@v1/index";

const {
  app: { port, environment },
} = config;

class App {
  public app: Application;
  public port: number;
  public env: string;

  constructor() {
    this.app = express();
    this.port = port;
    this.env = environment;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  private connectToDatabase = async () => {
    await connectMongoDb();
    console.info(`🌿[DB]: MongoDB Connected`);
  };

  private initializeMiddlewares() {
    i18n.default(this.app);

    httpLogger.default(this.app); //  Console log info regarding requests

    this.app.use(
      cors({
        origin: ["*"],
      })
    );

    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    if (config.other.swagger) {
      //  Added Swagger Docs
      swagger.default(this.app);
    }

    this.app.use(RequestHandler);
  }

  private initializeRoutes() {
    v1Routes(this.app);

    // Catch error 404 endpoint not found
    this.app.use("*", RouteNotFoundHandler);

    // Catch errors
    this.app.use(ErrorHandler);
  }

  public listen() {
    const onError = (error: { syscall: string; code: string }): void => {
      if (error.syscall !== "listen") {
        throw error;
      }

      const bind =
        typeof this.port === "string"
          ? `Pipe ${this.port}`
          : `Port ${this.port}`;

      // handle specific listen errors with friendly messages
      switch (error.code) {
        case "EACCES":
          console.error(chalk.red(`${bind} requires elevated privileges`));
          process.exit(1);
        case "EADDRINUSE":
          console.error(chalk.red(`${bind} is already in use`));
          process.exit(1);
        default:
          throw error;
      }
    };

    const onListening = (): void => {
      console.info(`=================================`);
      console.info(`======= ENV: ${chalk.cyan(this.env)} =======`);
      console.info(`🚀 App listening on the port ${chalk.cyan(this.port)}`);
      console.info(`=================================`);
    };

    // Run listener
    const server = this.app
      .listen(this.port)
      .on("error", onError)
      .on("listening", onListening);

    return server;
  }
}

export default App;
