const { Schema, model } = require("mongoose");

const workSchema = new Schema({
  _id: { type: Number, required: true },
  title: { type: String, required: true },
});

workSchema.index({ title: 1 }, { unique: true });

const WorkModel = model("Work", workSchema);

module.exports = WorkModel;
