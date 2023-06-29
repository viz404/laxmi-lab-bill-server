import express from "express";
import morgan from "morgan";
import cors from "cors";

import variables from "./config/variables";
import * as router from "./router";
import connectDatabase from "./config/database";

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
