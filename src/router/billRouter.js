import { Router } from "express";
import { billController } from "../controller";

const router = Router();

router.post("/manual", billController.addBillManual);

export default router;
