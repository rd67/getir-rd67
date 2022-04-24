import { STATUS_CODES, MESSAGES } from "@config/constants";

//  Validation Error Generate
export class ValidationError extends Error {
  public code: number = 0;
  public statusCode: number = STATUS_CODES.VALIDATION_FAILED;
  public data: any;
  public logError: boolean;

  constructor(
    data: any,
    message: string = MESSAGES.validationFailed,
    logError: boolean = true
  ) {
    super(message);

    //  This is a fix for incorrect instanceOf
    Object.setPrototypeOf(this, ValidationError.prototype);

    this.name = this.constructor.name;
    this.message = message;
    this.data = data;
    this.logError = logError;
  }
}

// 404 Error Generate
export class NotFoundError extends Error {
  public code: number = 0;
  public statusCode: number = STATUS_CODES.NOT_FOUND;
  public logError: boolean;

  constructor(message: string, logError: boolean = false) {
    super(message);

    //  This is a fix for incorrect instanceOf
    Object.setPrototypeOf(this, NotFoundError.prototype);

    this.name = this.constructor.name;
    this.logError = logError;
  }
}
