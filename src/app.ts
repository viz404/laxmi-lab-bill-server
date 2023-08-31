import express from "express";
import morgan from "morgan";
import cors from "cors";

import config from "./config/config.json";
import { ExpressMiddleware } from "./middlewares";
import { workRouter } from "./routers";
import { connectDatabase } from "./config";

const app = express();
const expressMiddleware = new ExpressMiddleware();

app.use(
    cors({
        origin: ["http://localhost:3000"],
    })
);
app.use(express.json());
app.use(morgan("tiny"));

app.get("/", (_, res) => {
    res.json({ message: "server is live" });
});

app.use("/api", workRouter);

app.use(expressMiddleware.errorMiddleware);

(async () => {
    await connectDatabase();
    console.log("Database connected");

    app.listen(config.PORT, () => {
        console.log("Server is listening to port", config.PORT);
    });
})();
