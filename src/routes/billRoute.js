const { Router } = require("express");
const {
  addBill,
  getBills,
  getBillById,
  deleteBillById,
} = require("../controllers/billController");

const billRouter = Router();

billRouter.post("/", addBill);
billRouter.get("/", getBills);
billRouter.get("/:id", getBillById);
billRouter.delete("/:id", deleteBillById);

module.exports = billRouter;
