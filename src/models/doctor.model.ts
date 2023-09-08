import { Schema, model, Model } from "mongoose";
import { IDoctor, IWork } from "../types/doctor.types";
import { MODEL } from "../config/constants";

const workSchema = new Schema<IWork>({
    title: { type: String, required: true },
    price: { type: String, required: true },
});

const doctorSchema = new Schema<IDoctor>({
    _id: { type: Number, required: true },
    name: { type: String, required: true, unique: true },
    phone: { type: Number },
    area: { type: String },
    address: { type: String },
    works: [workSchema],
});

export const DoctorModel: Model<IDoctor> = model(MODEL.DOCTOR, doctorSchema);
