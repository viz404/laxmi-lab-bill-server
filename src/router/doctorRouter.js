const { Router } = require("express");
const { doctorController } = require("../controller");
const { doctorMiddleware } = require("../middleware");

const doctorRouter = Router();

doctorRouter.post(
  "/",
  doctorMiddleware.verifyRequestBody,
  doctorController.addDoctor
);
doctorRouter.get("/", doctorController.getDoctors);
doctorRouter.get("/names", doctorController.getDoctorNames);
doctorRouter.get("/:id", doctorController.getDoctorById);
doctorRouter.patch("/:id", doctorController.updateDoctor);
doctorRouter.delete(
  "/:id",
  doctorMiddleware.checkDoctorReferences,
  doctorController.deleteDoctor
);

module.exports = doctorRouter;
