import { Response } from "express";

import { ExpressRequest } from "@config/interfaces";

import { AsyncHandler } from "@middlewares/common";

import { createResponse, successResponse } from "@helpers/response";

import * as services from "./services";

//  Users Listing
export const recordsList = AsyncHandler(
  async (req: ExpressRequest, res: Response) => {
    const records = await services.recordsList({
      ...req.body,
    });

    return successResponse(req, res, {
      records,
    });
  }
);
