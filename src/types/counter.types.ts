import { Document } from "mongoose";

export interface Ioptions {
    initialCount?: number;
}

export interface ICounter extends Document {
    model: string;
    count: number;
    createdAt: Date;
}
