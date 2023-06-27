import { Router } from "express";
import { doctorController } from "../controller";
import { doctorMiddleware } from "../middleware";

const router = Router();

router.post(
  "/",
  doctorMiddleware.verifyRequestBody,
  doctorController.addDoctor
);
router.get("/", doctorController.getDoctors);
router.get("/names", doctorController.getDoctorNames);
router.get("/:id", doctorController.getDoctorById);
router.patch("/:id", doctorController.updateDoctor);
router.delete(
  "/:id",
  doctorMiddleware.checkDoctorReferences,
  doctorController.deleteDoctor
);

export default router;
