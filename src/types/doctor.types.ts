import { Document } from "mongoose";
import { IValidationError } from "./common.types";

export interface IWork {
    title: string;
    price: string;
}

export interface IDoctor extends Document {
    id: number;
    name: string;
    phone?: number;
    area?: string;
    address?: string;
    works: IWork[];
    createdAt: Date;
    modifiedAt: Date;
}

export interface IDoctorRepository {
    createDoctor(
        name: string,
        phone: number | undefined,
        area: string | undefined,
        address: string | undefined,
        works: IWork[]
    ): Promise<IDoctor>;
    updateDoctor(
        id: number,
        name: string | undefined,
        phone: number | undefined,
        area: string | undefined,
        address: string | undefined,
        works: IWork[] | undefined
    ): Promise<IDoctor | undefined>;
    getDoctor(id: number): Promise<IDoctor | undefined>;
    getDoctors(page?: number, limit?: number): Promise<IDoctor[]>;
}

export interface IDoctorValidator {
    validateName(name: string): boolean;
    validateArea(area: string): boolean;
    validateAddress(address: string): boolean;
    validatePhone(phone: number): boolean;
    validateWorks(works: IWork[]): boolean;
    validateCreateDoctor(
        name: string,
        phone: number | undefined,
        area: string | undefined,
        address: string | undefined,
        works: IWork[]
    ): IValidationError[];
    validateUpdateDoctor(
        name: string | undefined,
        phone: number | undefined,
        area: string | undefined,
        address: string | undefined,
        works: IWork[] | undefined
    ): IValidationError[];
}
