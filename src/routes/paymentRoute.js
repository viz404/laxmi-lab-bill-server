const { Router } = require("express");

const { addPayment } = require("../controllers/paymentController");

const paymentRouter = Router();

paymentRouter.post("/", addPayment);

module.exports = paymentRouter;
