import { Schema, model } from "mongoose";

const counterSchema = new Schema(
    {
        model: { type: String, required: true, unique: true, index: true },
        count: { type: Number, required: true },
    },
    { timestamps: true }
);

export const counterModel = model("Counter", counterSchema);
