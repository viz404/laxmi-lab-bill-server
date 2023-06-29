import { Router } from "express";
import { workController } from "../controller";
import { workMiddleware } from "../middleware";

const workRouter = Router();

workRouter.post("/", workMiddleware.verifyRequestBody, workController.addWork);
workRouter.get("/", workController.getWorks);
workRouter.delete("/:id", workController.deleteWork);
workRouter.patch(
  "/:id",
  workMiddleware.verifyRequestBody,
  workController.updateWork
);

export default workRouter;
