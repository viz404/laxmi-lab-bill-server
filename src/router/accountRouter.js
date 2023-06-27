import { Router } from "express";
import { accountController } from "../controller";

const router = Router();

router.get("/doctors/:doctor_id", accountController.getAccount);

export default router;
