import { Schema, model } from "mongoose";

const jobSchema = new Schema(
  {
    id: { type: Number, required: true },
    date: { type: Date, required: true },
    job_number: { type: Number, required: true },
    patient_name: { type: String, default: "-" },
    shade: String,
    notes: String,
    works: [
      {
        title: { type: String, required: true },
        upper_left: String,
        upper_right: String,
        lower_left: String,
        lower_right: String,
      },
    ],
    doctor: {
      id: { type: Number, required: true },
      name: { type: String, required: true },
    },
  },
  { timestamps: true }
);

const JobModel = model("Job", jobSchema);

export default JobModel;
