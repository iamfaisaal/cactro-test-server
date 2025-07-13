import express from "express";
import cors from "cors";
import { Config } from "./config";

import spotifyRouter from "./routes/spotify";

const app = express();

const ALLOWED_DOMAINS = [Config.FRONTEND_URL];
app.use(
    cors({
        origin: ALLOWED_DOMAINS as string[],
        credentials: true,
    }),
);

app.use(express.json());

app.get("/", (req, res) => {
    res.send(`Server listening on ${Config.PORT}`);
});

app.use("/api/spotify", spotifyRouter);

export default app;
