import { Model } from "mongoose";
import { ICounter } from "../types/counter.types";

import { CounterModel } from "../models";

class CounterRepository {
    private counterModel: Model<ICounter>;

    constructor(counterModel: Model<ICounter>) {
        this.counterModel = counterModel;
    }

    async getId(model: string, initialCount = 1) {
        const prev = await this.counterModel.findOne({ model });

        const response = await this.counterModel.findOneAndUpdate(
            {
                model,
            },
            {
                $inc: { count: prev?.count ? 1 : initialCount },
            },
            {
                upsert: true,
                new: true,
            }
        );

        if (!response) {
            throw new Error(`No counter document found for model: ${model}`);
        }

        return response.count;
    }
}

export const counterRepository = new CounterRepository(CounterModel);
