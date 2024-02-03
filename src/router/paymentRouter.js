const { Router } = require("express");
const { paymentController } = require("../controller");

const paymentRouter = Router();

paymentRouter.post("/", paymentController.addPayment);

module.exports = paymentRouter;
