const { Schema, model } = require("mongoose");

const counterSchema = new Schema({
  model: { type: String, required: true },
  count: { type: Number, required: true },
});

const CounterModel = model("Counter", counterSchema);

module.exports = CounterModel;
