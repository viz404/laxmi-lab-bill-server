const { Schema, model } = require("mongoose");

const paymentSchema = new Schema(
  {
    id: { type: Number, required: true },
    doctor: {
      id: { type: Number, required: true },
      name: { type: String, required: true },
    },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    mode: {
      type: String,
      required: true,
      enum: ["UPI", "CHEQUE", "BANK-TRANSFER", "CASH"],
    },
    mobile: Number,
    cheque: Number,
    notes: String,
  },
  { timestamps: true }
);

const PaymentModel = model("Payment", paymentSchema);

module.exports = PaymentModel;
