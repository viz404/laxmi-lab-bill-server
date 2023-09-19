import express from "express";
import morgan from "morgan";
import cors from "cors";

import config from "./config/config";
import { connectDatabase } from "./config/database";
import { errorHandler } from "./middlewares";

const app = express();
const PORT = process.env.PORT || config.PORT;

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

app.use(errorHandler);

(async () => {
    await connectDatabase();
    console.log("Database connected");

    app.listen(PORT, () => {
        console.log("Server is listening to port", PORT);
    });
})();
