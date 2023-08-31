import mongoose from "mongoose";
import { config } from ".";

export const connectDatabase = async () => {
    await mongoose.connect(`${config.DATABASE_URI}/labv1`);
};
