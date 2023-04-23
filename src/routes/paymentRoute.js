const { Router } = require("express");

const { addPayment, getPayments } = require("../controllers/paymentController");

const paymentRouter = Router();

paymentRouter.post("/", addPayment);
paymentRouter.get("/", getPayments);

module.exports = paymentRouter;
