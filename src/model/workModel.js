import { Schema, model } from "mongoose";

const workSchema = new Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
});

const WorkModel = model("Work", workSchema);

export default WorkModel;
