import { Router } from "express";
import { jobController } from "../controller";
import { jobMiddleware } from "../middleware";

const jobRouter = Router();

jobRouter.post("/", jobMiddleware.verifyRequestBody, jobController.addJob);
jobRouter.get("/", jobController.getJobs);
jobRouter.get("/:id", jobController.getJobById);
jobRouter.get("/number/:job_number", jobController.getJobByNumber);
jobRouter.patch("/:id", jobController.updateJob);
jobRouter.delete("/:id", jobController.deleteJob);

export default jobRouter;
