import { Schema, model } from "mongoose";

const workSchema = new Schema(
    {
        _id: { type: Number, required: true },
        title: { type: String, required: true, unique: true },
    },
    { timestamps: true, versionKey: false }
);

export const WORK_MODEL_CONSTANT = "Work";

export const workModel = model(WORK_MODEL_CONSTANT, workSchema);
