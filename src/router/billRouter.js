import { Router } from "express";
import { billController } from "../controller";

const billRouter = Router();

billRouter.post("/manual", billController.addBillManual);

export default billRouter;
