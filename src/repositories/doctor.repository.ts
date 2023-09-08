import { Model } from "mongoose";
import { IDoctor, IDoctorRepository, IWork } from "../types/doctor.types";
import { MODEL } from "../config/constants";

import { counterRepository } from "./counter.repository";

export class DoctorRepository implements IDoctorRepository {
    private doctorModel: Model<IDoctor>;

    constructor(doctorModel: Model<IDoctor>) {
        this.doctorModel = doctorModel;
    }

    async createDoctor(
        name: string,
        phone: number | undefined,
        area: string | undefined,
        address: string | undefined,
        works: IWork[]
    ) {
        const id = await counterRepository.getId(MODEL.DOCTOR);

        const newDoctor = new this.doctorModel({
            _id: id,
            name: name,
            ...(phone && { phone }),
            ...(area && { area }),
            ...(address && { address }),
            works: works,
        });

        await newDoctor.save();

        const { _id } = newDoctor.toObject();
        return { id: _id };
    }
}
