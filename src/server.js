const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const billRouter = require("./routes/billRoute");
const doctorRouter = require("./routes/doctorRoute");
const workRouter = require("./routes/workRoute");
const jobRouter = require("./routes/jobRoute");
const accountRouter = require("./routes/accountRoute");
const transactionRouter = require("./routes/transactionRoute");

const app = express();

app.use(cors({ exposedHeaders: ["X-Total-Count"] }));
app.use(express.json());
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.send({ message: "server is running" });
});

app.use("/api/work", workRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/bill", billRouter);
app.use("/api/job", jobRouter);
app.use("/api/account", accountRouter);
app.use("/api/transaction", transactionRouter);

module.exports = app;
