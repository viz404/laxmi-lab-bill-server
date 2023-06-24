import { Router } from "express";
import { workController } from "../controller";
import { workMiddleware } from "../middleware";

const router = Router();

router.post("/", workMiddleware.verifyRequestBody, workController.addWork);
router.get("/", workController.getWorks);
router.delete("/:id", workController.deleteWork);
router.patch(
  "/:id",
  workMiddleware.verifyRequestBody,
  workController.updateWork
);

export default router;
