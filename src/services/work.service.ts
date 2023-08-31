import { WORK_MODEL_CONSTANT } from "../models";
import { WorkRepository, CounterRepository } from "../repositories";

const workRepository = new WorkRepository();
const counterRepository = new CounterRepository();

export class WorkService {
    async createWork(title: string) {
        const isValid = this.validate({ title });

        if (isValid === false) {
            return {
                status: 400,
                json: {
                    error: "Invalid request. Please pass the required fields.",
                },
            };
        }

        const isDuplicate = await this.checkDuplicate(title);

        if (isDuplicate) {
            return {
                status: 400,
                json: {
                    error: "Invalid request. Provided work already exist.",
                },
            };
        }

        const id = await counterRepository.getId(WORK_MODEL_CONSTANT);

        return {
            status: 201,
            json: await workRepository.create(title, id),
        };
    }

    async getAllWorks(title?: string) {
        return {
            status: 200,
            json: await workRepository.find(title),
        };
    }

    async updateWork(title: string, id: number) {
        const isValid = this.validate({ title, id });

        if (isValid === false) {
            return {
                status: 400,
                json: {
                    error: "Invalid request. Please pass the required fields.",
                },
            };
        }

        return {
            status: 200,
            json: await workRepository.update(title, id),
        };
    }

    private validate(params: Record<string, any>) {
        for (let key in params) {
            if (
                typeof params[key] === "undefined" ||
                params[key] === "null" ||
                params[key] === ""
            ) {
                return false;
            }
        }

        return true;
    }

    private async checkDuplicate(title: string) {
        const document = await workRepository.findExact(title);

        if (document) {
            return true;
        }

        return false;
    }
}
