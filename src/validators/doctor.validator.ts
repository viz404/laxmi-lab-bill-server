import { IValidationError } from "../types/common.types";
import { IDoctorValidator, IWork } from "../types/doctor.types";

export class DoctorValidator implements IDoctorValidator {
    validateName(name: string) {
        if (!name || typeof name !== "string" || name === "undefined") {
            return false;
        }
        return true;
    }

    validateArea(area: string) {
        if (!area || typeof area !== "string" || area === "undefined") {
            return false;
        }
        return true;
    }

    validateAddress(address: string) {
        if (
            !address ||
            typeof address !== "string" ||
            address === "undefined"
        ) {
            return false;
        }
        return true;
    }

    validatePhone(phone: number) {
        if (
            !phone ||
            typeof phone !== "number" ||
            phone.toString().length !== 10
        ) {
            return false;
        }
        return true;
    }

    validateWorks(works: IWork[]) {
        if (!Array.isArray(works) || works.length === 0) {
            return false;
        }

        for (let work of works) {
            if (!work.price || !work.title || Object.keys(work).length > 2) {
                return false;
            }
        }

        return true;
    }

    validateCreateDoctor(
        name: string,
        phone: number | undefined,
        area: string | undefined,
        address: string | undefined,
        works: IWork[]
    ) {
        const errors: IValidationError[] = [];

        if (this.validateName(name) === false) {
            errors.push({
                field: "name",
                message: "Name is required and should be a string",
            });
        }

        if (area && this.validateArea(area) === false) {
            errors.push({
                field: "area",
                message: "Area should be a string",
            });
        }

        if (phone && this.validatePhone(phone) === false) {
            errors.push({
                field: "phone",
                message: "phone should be a 10 digit number",
            });
        }

        if (address && this.validateAddress(address) === false) {
            errors.push({
                field: "address",
                message: "Address should be a string",
            });
        }

        if (this.validateWorks(works) === false) {
            errors.push({
                field: "works",
                message: "Works should be an array of works",
            });
        }

        return errors;
    }

    validateUpdateDoctor(
        name: string | undefined,
        phone: number | undefined,
        area: string | undefined,
        address: string | undefined,
        works: IWork[] | undefined
    ) {
        const errors: IValidationError[] = [];

        if (name && this.validateName(name) === false) {
            errors.push({
                field: "name",
                message: "Name is required and should be a string",
            });
        }

        if (area && this.validateArea(area) === false) {
            errors.push({
                field: "area",
                message: "Area should be a string",
            });
        }

        if (phone && this.validatePhone(phone) === false) {
            errors.push({
                field: "phone",
                message: "phone should be a 10 digit number",
            });
        }

        if (address && this.validateAddress(address) === false) {
            errors.push({
                field: "address",
                message: "Address should be a string",
            });
        }

        if (works && this.validateWorks(works) === false) {
            errors.push({
                field: "works",
                message: "Works should be an array of works",
            });
        }

        return errors;
    }
}
