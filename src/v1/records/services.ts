import {} from "mongoose";

import models from "@models/index";

import * as interfaces from "./interfaces";

//  Records Listing
export const recordsList = async (data: interfaces.RecordsListParams) => {
  //TODO: *** Pagination is not present

  return models.Record.aggregate([
    {
      $match: {
        $and: [
          {
            createdAt: {
              $gte: new Date(data.startDate),
              $lte: new Date(data.endDate),
            },
          },
          { $expr: { $gte: [{ $sum: "$counts" }, data.minCount] } },
          { $expr: { $lte: [{ $sum: "$counts" }, data.maxCount] } },
        ],
      },
    },
    {
      $project: {
        _id: 0,
        key: 1,
        createdAt: 1,
        totalCount: { $sum: "$counts" },
      },
    },
  ]);
};
