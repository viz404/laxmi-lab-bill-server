const { Router } = require("express");
const {
  addJob,
  getJobs,
  getJobById,
  updateJobById,
  deleteJobById,
} = require("../controllers/job.controller");

const jobRouter = Router();

jobRouter.post("/", addJob);
jobRouter.get("/", getJobs);
jobRouter.get("/:id", getJobById);
jobRouter.patch("/:id", updateJobById);
jobRouter.delete("/:id", deleteJobById);

module.exports = jobRouter;
