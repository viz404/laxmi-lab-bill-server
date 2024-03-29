const mongoose = require("mongoose");

const billSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    amount: { type: Number, required: true },
    previous_balance: { type: Number, required: true },
    total_amount: { type: Number, required: true },
    doctor: {
      id: { type: Number, required: true },
      phone: { type: Number, required: true },
      name: { type: String, required: true },
      address: { type: String, required: true },
    },
    jobs: [
      {
        id: { type: Number, required: true },
        amount: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

const BillModel = mongoose.model("Bill", billSchema);
module.exports = BillModel;
