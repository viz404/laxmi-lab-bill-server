import { Router, response } from "express";
import { WorkService } from "../services/work.service";

export const workRouter = Router();
const workService = new WorkService();

workRouter.post("/works", async (req, res, next) => {
    try {
        const { title } = req.body;

        const { status, json } = await workService.createWork(title);

        if ("id" in json) {
            res.location(`/api/works/${json.id}`);
        }

        return res.status(status).json(json);
    } catch (error) {
        next(error);
    }
});

workRouter.get("/works", async (req, res, next) => {
    try {
        const search = req.query.search as string;

        const { status, json } = await workService.getAllWorks(search);

        return res.status(status).json(json);
    } catch (error) {
        next(error);
    }
});

workRouter.patch("/works/:id", async (req, res, next) => {
    const { id } = req.params;
    const { title } = req.body;

    const { status, json } = await workService.updateWork(title, Number(id));

    return res.status(status).json(json);
});
