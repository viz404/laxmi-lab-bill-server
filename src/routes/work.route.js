const { Router } = require("express");
const {
  getWorkTypes,
  addWorkType,
  deleteWorkType,
} = require("../controllers/work.controller");

const workRouter = Router();

workRouter.get("/", getWorkTypes);
workRouter.post("/", addWorkType);
workRouter.delete("/:id", deleteWorkType);

module.exports = workRouter;
