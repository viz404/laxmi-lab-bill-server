import { Model, Schema, model } from "mongoose";
import { MODEL } from "../config/constants";
import { ICounter } from "../types/counter.types";

const counterSchema = new Schema<ICounter>({
    model: { type: String, required: true, index: true },
    count: { type: Number, required: true },
    createdAt: { type: Date, default: new Date() },
});

export const CounterModel: Model<ICounter> = model(
    MODEL.COUNTER,
    counterSchema
);
