import { IDoctorRepository, IWork } from "../types/doctor.types";

export class DoctorService {
    private doctorRepository: IDoctorRepository;

    constructor(doctorRepository: IDoctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    async createDoctor(
        name: string,
        phone: number | undefined,
        area: string | undefined,
        address: string | undefined,
        works: IWork[]
    ) {
        this.validateCreateDoctor(name, phone, area, address, works);

        try {
            const newDoctor = await this.doctorRepository.createDoctor(
                name,
                phone,
                area,
                address,
                works
            );

            return newDoctor;
        } catch (error) {
            throw new Error("Failed to create doctor: " + error.message);
        }
    }

    private validateCreateDoctor(
        name: string,
        phone: number | undefined,
        area: string | undefined,
        address: string | undefined,
        works: IWork[]
    ) {
        if (!name || typeof name !== "string") {
            throw new Error("Name validation failed");
        }

        if (area && typeof area !== "string") {
            throw new Error("Area validation failed");
        }

        if (phone && (typeof phone !== "number" || isNaN(phone))) {
            throw new Error("Phone validation failed");
        }

        if (address && typeof address !== "string") {
            throw new Error("Address validation failed");
        }

        if (!Array.isArray(works) || works.length === 0) {
            throw new Error("Works validation failed");
        }
    }
}
