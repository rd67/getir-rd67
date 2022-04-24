import express from "express";

import { ValidationHandler } from "@middlewares/index";

import * as controllers from "./controllers";
import * as validators from "./validators";

const router = express.Router();

router
  .route("/")
  //Listing Should be a Get Request
  .post(ValidationHandler(validators.recordsList), controllers.recordsList);

export default router;
