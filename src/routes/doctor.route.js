const { Router } = require("express");
const {
  getDoctors,
  getDoctorById,
  addDoctor,
  deleteDoctorById,
} = require("../controllers/doctor.controller");

const doctorRouter = Router();

doctorRouter.get("/", getDoctors);
doctorRouter.get("/:id", getDoctorById);
doctorRouter.post("/", addDoctor);
doctorRouter.delete("/:id", deleteDoctorById);

module.exports = doctorRouter;
