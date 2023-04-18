const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const billRouter = require("./routes/billRoute");
const doctorRouter = require("./routes/doctorRoute");
const workRouter = require("./routes/workRoute");
const jobRouter = require("./routes/jobRoute");

const app = express();

app.use(cors({ exposedHeaders: ["X-Total-Count"] }));
app.use(express.json());
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.send({ message: "server is running" });
});

app.use("/api/v1/work", workRouter);
app.use("/api/v1/doctor", doctorRouter);
app.use("/api/v1/bill", billRouter);
app.use("/api/v1/job", jobRouter);

module.exports = app;
