import { Schema, model } from "mongoose";

const transactionSchema = new Schema({
  id: { type: Number, required: true },
  particular: { type: String, required: true },
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  reference: { type: Number, required: true },
  type: { type: String, required: true, enum: ["Bill", "Payment"] },
  doctor: {
    id: { type: Number, required: true },
    name: { type: String, required: true },
  },
});

const TransactionModel = model("Transaction", transactionSchema);

export default TransactionModel;
