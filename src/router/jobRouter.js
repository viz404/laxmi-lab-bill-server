import { Router } from "express";
import { jobController } from "../controller";
import { jobMiddleware } from "../middleware";

const router = Router();

router.post("/", jobMiddleware.verifyRequestBody, jobController.addJob);
router.get("/", jobController.getJobs);
router.get("/:id", jobController.getJobById);
router.get("/number/:job_number", jobController.getJobByNumber);
router.patch("/:id", jobController.updateJob);
router.delete("/:id", jobController.deleteJob);

export default router;
