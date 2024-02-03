const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const variables = require("./config/variables");
const router = require("./router");
const connectDatabase = require("./config/database");

const app = express();
const PORT = variables.PORT;

app.use(cors({ exposedHeaders: ["x-total-count"] }));
app.use(express.json());
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.json({ message: "Hi, I'm the server" });
});

app.use("/api/works", router.workRouter);
app.use("/api/doctors", router.doctorRouter);
app.use("/api/jobs", router.jobRouter);
app.use("/api/accounts", router.accountRouter);
app.use("/api/bills", router.billRouter);
app.use("/api/payments", router.paymentRouter);

connectDatabase()
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log("Server started on port", PORT);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:\n", error);
  });
