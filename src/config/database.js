import mongoose from "mongoose";
import variables from "./variables";

async function connectDatabase() {
  try {
    await mongoose.connect(variables.SERVER_URL);
  } catch (error) {
    throw new Error(error);
  }
}

export default connectDatabase;
