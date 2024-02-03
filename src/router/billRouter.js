const { Router } = require("express");
const { billController } = require("../controller");
const { billMiddleware } = require("../middleware");

const billRouter = Router();

billRouter.post("/manual", billController.addBillManual);
billRouter.post("/", billMiddleware.verifyRequestBody, billController.addBill);
billRouter.get("/:bill_id", billController.getBill);
billRouter.get("/", billController.getBills);
billRouter.delete("/:id", billController.deleteBill);

module.exports = billRouter;
