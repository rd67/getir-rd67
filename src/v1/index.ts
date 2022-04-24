import { Application } from "express";

import { default as v1Records } from "./records/routes";

const API_V1_PERFIX = "/v1";

export default (app: Application) => {
  app.use(`${API_V1_PERFIX}/records`, v1Records);
};
