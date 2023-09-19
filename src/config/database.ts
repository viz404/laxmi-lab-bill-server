import mongoose from "mongoose";
import config from "./config";

export const connectDatabase = async () => {
    await mongoose.connect(`${config.DATABASE_URI}/labv1`);
};
