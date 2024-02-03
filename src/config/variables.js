require("dotenv").config();

module.exports = {
  PORT: 8080,
  SERVER_URL: process.env.DB_URI,
};
