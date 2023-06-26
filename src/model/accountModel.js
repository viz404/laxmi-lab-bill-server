import { Schema, model } from "mongoose";

const accountSchema = new Schema({
  id: { type: Number, required: true },
  doctor: {
    id: { type: Number, required: true },
    name: { type: String, required: true },
  },
  previous_bill: {
    id: Number,
    amount: { type: Number, default: 0 },
    date: Date,
  },
  previous_payment: {
    id: Number,
    amount: { type: Number, default: 0 },
    date: Date,
  },
  balance: { type: Number, default: 0 },
});

const AccountModel = model("Account", accountSchema);

export default AccountModel;
