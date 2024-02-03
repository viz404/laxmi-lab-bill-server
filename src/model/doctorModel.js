const { Schema, model } = require("mongoose");

const doctorSchema = new Schema(
  {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    phone: { type: Number, default: 0 },
    area: { type: String, default: "-" },
    address: { type: String, default: "-" },
    works: [
      {
        title: { type: String, required: true },
        price: { type: Number, required: true },
        price_distribution: {
          type: String,
          required: true,
          enum: ["SINGLE-UNIT", "FIRST-UNIT", "ALL-UNIT"],
        },
        misc: Object,
      },
    ],
  },
  { timestamps: true }
);

const DoctorModel = model("Doctor", doctorSchema);

module.exports = DoctorModel;
