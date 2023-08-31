import { counterModel } from "../models";

export class CounterRepository {
    async getId(model: string, initialCount = 1) {
        const prev = await counterModel.findOne({ model });

        const response = await counterModel.findOneAndUpdate(
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
            throw new Error("No counter document found for " + model);
        }

        return response.count;
    }
}
