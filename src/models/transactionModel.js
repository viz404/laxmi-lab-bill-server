const { Schema, model } = require("mongoose");

const transactionSchema = new Schema(
  {
    _id: { type: Number, required: true },
    doctor: { type: Number, ref: "Doctor", required: true },
    balance: { type: Number, required: true },
    particular: { type: String, required: true },
    bill: { type: Number, ref: "Bill" },
    payment: { type: Number, ref: "Payment" },
  },
  { timestamps: true }
);

const TransactionModel = model("Transaction", transactionSchema);

module.exports = TransactionModel;
