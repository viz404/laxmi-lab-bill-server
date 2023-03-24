const app = require("./src/server");
const connectDatabase = require("./src/config/database");
require("dotenv").config();

const PORT = process.env.PORT;

connectDatabase().then(() => {
  console.log("Database connected");
  app.listen(PORT, async () => {
    console.log("Server is listening on port: " + PORT);
  });
});
