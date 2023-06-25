import mongoose, { Schema, model } from "mongoose";

const billSchema = new Schema({
  id: { type: Number, required: true },
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  previous_balance: { type: Number, required: true },
  total_amount: { type: Number, required: true },
  doctor: {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
  },
  jobs: [{ type: Number, required: true }],
});

const BillModel = mongoose.model("Bill", billSchema);
export default BillModel;
