const { Schema, model } = require("mongoose");

const billSchema = new Schema({
  doctorId: { type: Schema.Types.ObjectId, required: true, ref: "Doctor" },
  doctorName: { type: String, required: true },
  doctorAddress: { type: String, required: true },
  createdAt: { type: Date, required: true },
  fromDate: { type: Date, required: true },
  tillDate: { type: Date, required: true },
  totalAmount: { type: Number, required: true },
  jobs: [
    {
      date: { type: Date, required: true },
      jobNo: { type: Number, required: true },
      patientName: { type: String, required: true },
      price: { type: Number, required: true },
      works: [
        {
          title: { type: String, required: true },
          topLeft: String,
          topRight: String,
          bottomLeft: String,
          bottomRight: String,
        },
      ],
    },
  ],
});

const BillModel = model("Bill", billSchema);

module.exports = BillModel;
