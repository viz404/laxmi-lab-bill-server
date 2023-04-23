const { Schema, model } = require("mongoose");

const paymentSchema = new Schema({
  _id: { type: Number, required: true },
  doctor: { type: Number, ref: "Doctor", required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  mode: { type: String, required: true },
  mobile: Number,
  chequeNumber: Number,
  notes: String,
});

const PaymentModel = model("Payment", paymentSchema);

module.exports = PaymentModel;
