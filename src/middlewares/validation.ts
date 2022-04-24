import { NextFunction, Request, Response } from "express";
import Joi, { Schema } from "joi";

import { capitalizeFirstLetter, pick } from "@helpers/common";
import { ValidationError } from "@helpers/errors";

//  This one picks the value from "params", "query", "body" as per the validation schema and validate the request. Not using libs like lodash to pick values
export const ValidationHandler =
  (schema: { params?: Schema; query?: Schema; body?: Schema }) =>
  (req: Request, res: Response, next: NextFunction) => {
    const validSchema = pick(schema, ["params", "query", "body"]);
    const data = pick(req, Object.keys(validSchema));
    const { value, error } = Joi.compile(validSchema)
      .prefs({
        abortEarly: false,
        errors: { label: "key" },
        allowUnknown: true,
      })
      .validate(data);

    let errors: any = null;
    error?.details.map((detail: Joi.ValidationErrorItem) => {
      if (!errors) {
        errors = {};
      }
      errors[`${detail?.context?.key}`] = capitalizeFirstLetter(detail.message);

      return null;
    });

    if (errors) {
      throw new ValidationError(errors, undefined, false);
    }
    Object.assign(req, value);
    return next();
  };
