import { model, Schema, Document, LeanDocument } from "mongoose";

import * as interfaces from "@interfaces/records";

//  Main Schemas
interface IRecord extends Document, interfaces.IRecord {}

const RecordSchema = new Schema(
  {
    key: { type: String, required: true },
    value: { type: String, required: true },

    startDt: { type: Date, default: Date.now },

    counts: { type: [Number], default: [] },
  },
  {
    timestamps: false,
    collection: "records",
  }
);

export default model<IRecord>("records", RecordSchema);
