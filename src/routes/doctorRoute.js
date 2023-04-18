const { Router } = require("express");
const {
  getDoctors,
  getDoctorById,
  addDoctor,
  deleteDoctorById,
  updateDoctorById,
} = require("../controllers/doctorController");

const doctorRouter = Router();

doctorRouter.get("/", getDoctors);
doctorRouter.get("/:id", getDoctorById);
doctorRouter.post("/", addDoctor);
doctorRouter.delete("/:id", deleteDoctorById);
doctorRouter.patch("/:id", updateDoctorById);

module.exports = doctorRouter;
