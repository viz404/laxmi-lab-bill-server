import { Schema, model } from "mongoose";

const counterSchema = new Schema({
  model: { type: String, required: true },
  count: { type: Number, required: true },
});

const CounterModel = model("Counter", counterSchema);

export default CounterModel;
