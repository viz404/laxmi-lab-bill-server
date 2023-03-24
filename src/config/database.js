const mongoose = require("mongoose");
require("dotenv").config();

const connection_url = process.env.SERVER_URL;
const database_name = "laxmi_lab";

async function connectDatabase() {
  await mongoose.connect(`${connection_url}/${database_name}`);
}

module.exports = connectDatabase;
