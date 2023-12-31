import { Schema, model, models } from "mongoose";
const ResolutionSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Resolution = models.Resolution || model("Resolution", ResolutionSchema);

export default Resolution;
