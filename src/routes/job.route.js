const { Router } = require("express");
const { addJob } = require("../controllers/job.controller");

const jobRouter = Router();

jobRouter.post("/", addJob);

module.exports = jobRouter;
