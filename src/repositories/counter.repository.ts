import { CounterModel } from "../models";

class CounterRepository {
    async getId(model: string, initialCount = 1) {
        const prev = await CounterModel.findOne({ model });

        const response = await CounterModel.findOneAndUpdate(
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

export const counterRepository = new CounterRepository();
