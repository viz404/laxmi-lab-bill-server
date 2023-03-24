const { Schema, model } = require("mongoose");

const doctorSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: Number, require: true },
  area: { type: String, required: true },
  address: { type: String, required: true },
  typeOfWorks: [
    {
      title: { type: String, required: true },
      price: { type: Number, required: true },
    },
  ],
});

const DoctorModel = model("Doctor", doctorSchema);

module.exports = DoctorModel;
