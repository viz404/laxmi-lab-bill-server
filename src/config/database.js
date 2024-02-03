const mongoose = require("mongoose");
const variables = require("./variables");

async function connectDatabase() {
  try {
    await mongoose.connect(variables.SERVER_URL);
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = connectDatabase;
