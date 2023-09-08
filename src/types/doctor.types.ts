import { Document } from "mongoose";

export interface IWork {
    title: string;
    price: string;
}

export interface IDoctor extends Document {
    _id: number;
    name: string;
    phone?: number;
    area?: string;
    address?: string;
    works: IWork[];
}

interface IDoctorResponse {
    id: number;
}

export interface IDoctorRepository {
    createDoctor: (
        name: string,
        phone: number | undefined,
        area: string | undefined,
        address: string | undefined,
        works: IWork[]
    ) => Promise<IDoctorResponse>;
}
