import mongoose from "mongoose";

import config from "@config/config";

import records from "./records";

export const connectMongoDb = () => {
  return mongoose.connect(config.db.url);
};

export const mongoDB = mongoose.connection;
mongoDB.on("error", console.error.bind(console, "connection error:"));

export default {
  Record: records,
};
