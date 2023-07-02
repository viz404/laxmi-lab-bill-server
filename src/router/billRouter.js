import { Router } from "express";
import { billController } from "../controller";
import { billMiddleware } from "../middleware";

const billRouter = Router();

billRouter.post("/manual", billController.addBillManual);
billRouter.post("/", billMiddleware.verifyRequestBody, billController.addBill);
billRouter.get("/:bill_id", billController.getBill);
billRouter.get("/", billController.getBills);
billRouter.delete("/:id", billController.deleteBill);

export default billRouter;
