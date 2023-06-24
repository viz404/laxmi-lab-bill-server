import { Schema, model } from "mongoose";

const accountSchema = new Schema({
  id: { type: Number, required: true },
  doctor: {
    id: { type: Number, required: true },
    name: { type: String, required: true },
  },
  previous_bill: {
    id: Number,
    amount: Number,
    date: Date,
  },
  previous_payment: {
    id: Number,
    amount: Number,
    date: Date,
  },
  balance: { type: Number, required: true },
});

const AccountModel = model("Account", accountSchema);

export default AccountModel;
