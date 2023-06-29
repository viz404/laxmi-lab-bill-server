import { Router } from "express";
import { doctorController } from "../controller";
import { doctorMiddleware } from "../middleware";

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

export default doctorRouter;
