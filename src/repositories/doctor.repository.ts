import { IDoctor, IDoctorRepository, IWork } from "../types/doctor.types";
import { MODEL } from "../config/constants";

import { counterRepository } from "./counter.repository";
import { DoctorModel } from "../models/doctor.model";

export class DoctorRepository implements IDoctorRepository {
    async createDoctor(
        name: string,
        phone: number | undefined,
        area: string | undefined,
        address: string | undefined,
        works: IWork[]
    ) {
        const id = await counterRepository.getId(MODEL.DOCTOR);

        const response = await DoctorModel.create({
            _id: id,
            name: name,
            ...(phone && { phone }),
            ...(area && { area }),
            ...(address && { address }),
            works: works,
        });

        const { _id, __v, ...rest } = response.toObject();
        return { ...rest, id } as IDoctor;
    }

    async updateDoctor(
        id: number,
        name: string | undefined,
        phone: number | undefined,
        area: string | undefined,
        address: string | undefined,
        works: IWork[] | undefined
    ) {
        const response = await DoctorModel.findByIdAndUpdate(id, {
            ...(name && { name }),
            ...(phone && { phone }),
            ...(area && { area }),
            ...(address && { address }),
            ...(works && { works }),
        });

        if (!response) {
            return undefined;
        }

        const { _id, __v, ...rest } = response.toObject();
        return { ...rest, id } as IDoctor;
    }

    async getDoctor(id: number) {
        const response = await DoctorModel.findById(id);

        if (!response) {
            return undefined;
        }

        const { _id, __v, ...rest } = response.toObject();
        return { ...rest, id } as IDoctor;
    }

    async getDoctors(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const response = await DoctorModel
            .find()
            .skip(skip)
            .limit(limit)
            .select({ _id: 0, __v: 0, id: "$_id" });
    }
}
