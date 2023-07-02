import { Router } from "express";
import { paymentController } from "../controller";

const paymentRouter = Router();

paymentRouter.post("/", paymentController.addPayment);

export default paymentRouter;
