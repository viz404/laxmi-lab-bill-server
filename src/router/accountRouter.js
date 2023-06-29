import { Router } from "express";
import { accountController } from "../controller";

const accountRouter = Router();

accountRouter.get("/doctors/:doctor_id", accountController.getAccount);

export default accountRouter;
