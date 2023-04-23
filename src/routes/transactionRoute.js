const { Router } = require("express");
const { getTransactions } = require("../controllers/transactionController");

const transactionRouter = Router();

transactionRouter.get("/:doctorId", getTransactions);

module.exports = transactionRouter;
