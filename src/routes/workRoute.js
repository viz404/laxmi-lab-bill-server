const { Router } = require("express");
const {
  getWorkTypes,
  addWorkType,
  deleteWorkType,
  updateWorkType,
} = require("../controllers/workController");

const workRouter = Router();

workRouter.get("/", getWorkTypes);
workRouter.post("/", addWorkType);
workRouter.delete("/:id", deleteWorkType);
workRouter.patch("/:id", updateWorkType);

module.exports = workRouter;
