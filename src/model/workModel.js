const { Schema, model } = require("mongoose");

const workSchema = new Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
});

const WorkModel = model("Work", workSchema);

module.exports = WorkModel;
