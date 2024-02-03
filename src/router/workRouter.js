const { Router } = require("express");
const { workController } = require("../controller");
const { workMiddleware } = require("../middleware");

const workRouter = Router();

workRouter.post("/", workMiddleware.verifyRequestBody, workController.addWork);
workRouter.get("/", workController.getWorks);
workRouter.delete("/:id", workController.deleteWork);
workRouter.patch(
  "/:id",
  workMiddleware.verifyRequestBody,
  workController.updateWork
);

module.exports = workRouter;
