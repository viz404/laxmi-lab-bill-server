import {
    IDoctorRepository,
    IDoctorValidator,
    IWork,
} from "../types/doctor.types";

export class DoctorService {
    private doctorRepository: IDoctorRepository;
    private doctorValidator: IDoctorValidator;

    constructor(
        doctorRepository: IDoctorRepository,
        doctorValidator: IDoctorValidator
    ) {
        this.doctorRepository = doctorRepository;
        this.doctorValidator = doctorValidator;
    }

    async createDoctor(
        name: string,
        phone: number | undefined,
        area: string | undefined,
        address: string | undefined,
        works: IWork[]
    ) {
        const errors = this.doctorValidator.validateCreateDoctor(
            name,
            phone,
            area,
            address,
            works
        );

        if (errors.length > 0) {
            return {
                status: 403,
                data: {
                    message: "Validation failed",
                    errors,
                },
            };
        }

        try {
            const newDoctor = await this.doctorRepository.createDoctor(
                name,
                phone,
                area,
                address,
                works
            );

            return {
                status: 200,
                data: {
                    id: newDoctor.id,
                    createdAt: newDoctor.createdAt,
                },
            };
        } catch (error) {
            console.error(error);
            return {
                status: 500,
                data: {
                    message: "Failed to create doctor",
                },
            };
        }
    }

    async updateDoctor(
        id: number,
        name: string | undefined,
        phone: number | undefined,
        area: string | undefined,
        address: string | undefined,
        works: IWork[] | undefined
    ) {
        const errors = this.doctorValidator.validateUpdateDoctor(
            name,
            phone,
            area,
            address,
            works
        );

        if (errors.length > 0) {
            return {
                status: 403,
                data: {
                    message: "Validation failed",
                    errors,
                },
            };
        }

        try {
            const updatedDoctor = await this.doctorRepository.updateDoctor(
                id,
                name,
                phone,
                area,
                address,
                works
            );

            if (!updatedDoctor) {
                return {
                    status: 404,
                    data: {
                        message: "No doctor found matching the given id",
                    },
                };
            }

            return {
                status: 200,
                data: {
                    id,
                    modifiedAt: updatedDoctor.modifiedAt,
                },
            };
        } catch (error) {
            console.error(error);
            return {
                status: 500,
                data: {
                    message: `Failed to update doctor ${id}`,
                },
            };
        }
    }
}
