const { Router } = require("express");
const {
  getAccounts,
  getAccountByDoctorId,
} = require("../controllers/accountController");

const accountRouter = Router();

accountRouter.get("/", getAccounts);
accountRouter.get("/:doctorId", getAccountByDoctorId);

module.exports = accountRouter;
