const { Schema, model } = require("mongoose");

const jobSchema = new Schema(
  {
    _id: { type: Number, required: true },
    doctor: { type: Schema.Types.ObjectId, required: true, ref: "Doctor" },
    date: { type: Date, required: true },
    jobNumber: { type: Number, required: true },
    patientName: { type: String, required: true },
    shade: String,
    notes: String,
    price: { type: Number, required: true },
    works: [
      {
        title: { type: String, required: true },
        singlePrice: { type: Number, required: true },
        topLeft: String,
        topRight: String,
        bottomLeft: String,
        bottomRight: String,
      },
    ],
  },
  { timestamps: true }
);

const JobModel = model("Job", jobSchema);

module.exports = JobModel;
