const { Schema, model } = require("mongoose");

const billSchema = new Schema(
  {
    _id: { type: Number, required: true },
    doctor: { type: Number, ref: "Doctor", required: true },
    fromDate: { type: Date, required: true },
    tillDate: { type: Date, required: true },
    totalAmount: { type: Number, required: true },
    jobs: [{ type: Number, ref: "Job", required: true }],
  },
  { timestamps: true }
);

const BillModel = model("Bill", billSchema);

module.exports = BillModel;
