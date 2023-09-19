import { Router } from "express";
import { DoctorService } from "../services/doctor.service";
import { DoctorRepository } from "../repositories/doctor.repository";
import { DoctorModel } from "../models/doctor.model";
import { DoctorValidator } from "../validators";

export const doctorRouter = Router();
const doctorService = new DoctorService(
    new DoctorRepository(DoctorModel),
    new DoctorValidator()
);

doctorRouter.post("/doctors", async (req, res, next) => {
    try {
        const { name, phone, area, address, works } = req.body;
        const { status, data } = await doctorService.createDoctor(
            name,
            phone,
            area,
            address,
            works
        );
        return res.status(status).json(data);
    } catch (error) {
        next(error);
    }
});

doctorRouter.patch("/doctors/:id", async (req, res, next) => {
    try {
        const { name, phone, area, address, works } = req.body;
        const id = Number(req.params.id);
        const { status, data } = await doctorService.updateDoctor(
            id,
            name,
            phone,
            area,
            address,
            works
        );
        return res.status(status).json(data);
    } catch (error) {
        next(error);
    }
});
