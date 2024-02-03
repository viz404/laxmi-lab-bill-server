const { Router } = require("express");
const { jobController } = require("../controller");
const { jobMiddleware } = require("../middleware");

const jobRouter = Router();

jobRouter.post("/", jobMiddleware.verifyRequestBody, jobController.addJob);
jobRouter.get("/", jobController.getJobs);
jobRouter.get("/:id", jobController.getJobById);
jobRouter.get("/number/:job_number", jobController.getJobByNumber);
jobRouter.patch("/:id", jobController.updateJob);
jobRouter.delete("/:id", jobController.deleteJob);
jobRouter.get(
  "/price/doctor/:doctor_id",
  jobMiddleware.verifyPriceRequest,
  jobController.getJobsWithPrice
);

module.exports = jobRouter;
