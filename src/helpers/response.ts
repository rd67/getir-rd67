import { Request, Response } from "express";

import config from "@config/config";
import { STATUS_CODES, MESSAGES } from "@config/constants";

import { NotFoundError, ValidationError } from "@helpers/errors";

import { logger, logInfo } from "@packages/logger";

export const successResponse = (
  req: Request,
  res: Response,
  data: any = {},
  message = MESSAGES.success,
  statusCode = STATUS_CODES.SUCCESS
) => {
  const result = {
    code: 1,
    // statusCode,
    msg: res.__(message), //Added Localization to response
    data,
  };

  //@ts-ignore
  const { originalUrl, method, reqId } = req;

  logInfo({
    reqId,
    req: {
      originalUrl,
      method,
      statusCode,
    },
  });

  return res.status(statusCode).json(result);
};

export const createResponse = (
  req: Request,
  res: Response,
  data: any = {},
  message = MESSAGES.success,
  statusCode = STATUS_CODES.CREATED
) => {
  const result = {
    code: 1,
    // statusCode,
    msg: res.__(message), //Added Localization to response
    data,
  };

  //@ts-ignore
  const { originalUrl, method, reqId } = req;

  logInfo({
    reqId,
    req: {
      originalUrl,
      method,
      statusCode,
    },
  });

  return res.status(statusCode).json(result);
};

export const errorResponse = (error: any, req: Request, res: Response) => {
  //TODO: **** Add Sentry or other logger for notifications

  const statusCode =
    error.statusCode ?? error.response?.status ?? STATUS_CODES.ERROR;

  const logError = error.logError ?? true;

  //@ts-ignore
  const { reqId } = req;

  if (statusCode === STATUS_CODES.ERROR) {
    // This clips the constructor invocation from the stack trace.
    // It's not absolutely essential, but it does make the stack trace a little nicer.
    Error.captureStackTrace(error, error.constructor);
  }

  if (logError) {
    logger.error(
      `statusCode=>${statusCode}, originalUrl=>${req.originalUrl}, method=>${req.method}, reqId=>${reqId}, Stack=>${error.stack}, error=>${error}`
    );
  }
  console.error(error);

  if (config.app.isProduction && statusCode === STATUS_CODES.ERROR) {
    //TODO: **** Add Sentry or other logger for notifications
    return res.status(statusCode).json({
      code: 0,
      // statusCode,
      msg: res.__(MESSAGES.serverError),
      data: {},
    });
  }

  const message =
    error instanceof NotFoundError || error instanceof ValidationError
      ? res.__(error.message)
      : error.toString();

  return res.status(statusCode).json({
    code: 0,
    // statusCode,
    msg: message,
    data: error.data,
  });
};
