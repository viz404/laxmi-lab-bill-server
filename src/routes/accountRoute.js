const { Router } = require("express");
const { getAccounts } = require("../controllers/accountController");

const accountRouter = Router();

accountRouter.get("/", getAccounts);

module.exports = accountRouter;
