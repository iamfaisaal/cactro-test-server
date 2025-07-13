import { config } from "dotenv";
import path from "path";

config({
    path: path.join(__dirname, `../../.env.dev`),
});

const {
    NODE_ENV,
    PORT,
    FRONTEND_URL,
    ACCESS_TOKEN,
    REFRESH_TOKEN,
    SPOTIFY_CLIENT_ID,
    SPOTIFY_SECRET_ID,
} = process.env;

export const Config = {
    NODE_ENV,
    PORT,
    FRONTEND_URL,
    ACCESS_TOKEN,
    REFRESH_TOKEN,
    SPOTIFY_CLIENT_ID,
    SPOTIFY_SECRET_ID,
};
