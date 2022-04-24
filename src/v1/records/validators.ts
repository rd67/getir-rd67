import DateExtension from "@joi/date";
import * as JoiImport from "joi";

const Joi = JoiImport.extend(DateExtension);

//  Listing
export const recordsList = {
  body: Joi.object().keys({
    startDate: Joi.date().format("YYYY-MM-DD").required(),
    endDate: Joi.date()
      .format("YYYY-MM-DD")
      .greater(Joi.ref("startDate"))
      .required(),

    minCount: Joi.number().required(),
    maxCount: Joi.number().min(Joi.ref("minCount")).required(),
  }),
};
