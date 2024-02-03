const { Router } = require("express");
const { accountController } = require("../controller");

const accountRouter = Router();

accountRouter.get("/doctors/:doctor_id", accountController.getAccount);

module.exports = accountRouter;
