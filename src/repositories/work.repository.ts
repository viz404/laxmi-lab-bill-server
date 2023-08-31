import { workModel } from "../models";

export class WorkRepository {
    async create(title: string, id: number) {
        const response = await workModel.create({
            _id: id,
            title,
        });

        const { _id, ...rest } = response.toObject();
        return { id: _id, ...rest };
    }

    async find(title?: string) {
        const query = {
            ...(title && { title: { $regex: title } }),
        };

        const options = {
            _id: 0,
            id: "$_id",
            title: 1,
        };

        return workModel.find(query, options);
    }

    async findExact(title: string) {
        return workModel.findOne({ title });
    }

    async update(title: string, id: number) {
        return workModel.findOneAndUpdate(
            { _id: id },
            { title },
            { new: true, _id: 0, title: 1, id: "$_id" }
        );
    }

    async delete(id: number) {
        return workModel.deleteOne({ id });
    }
}
