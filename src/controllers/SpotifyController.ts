/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Request, Response, NextFunction } from "express";
import { Logger } from "winston";
import axios from "axios";
import { Config } from "../config";

export class SpotifyController {
    constructor(private logger: Logger) {}

    getAll = async (req: Request, res: Response, next: NextFunction) => {
        this.logger.info("Fetching top 10 tracks");

        try {
            const response = await axios.get(
                "https://api.spotify.com/v1/me/top/tracks?limit=10",
                {
                    headers: {
                        Authorization: `Bearer ${Config.ACCESS_TOKEN}`,
                    },
                },
            );

            res.status(200).json({ topTracks: response.data });
        } catch (error: any) {
            this.logger.error(
                "Error fetching top tracks",
                error.response?.data || error.message,
            );
            return next(error);
        }
    };

    getCurrent = async (req: Request, res: Response, next: NextFunction) => {
        this.logger.info("Fetching currently playing song");

        try {
            const response = await axios.get(
                "https://api.spotify.com/v1/me/player/currently-playing",
                {
                    headers: {
                        Authorization: `Bearer ${Config.ACCESS_TOKEN}`,
                    },
                },
            );

            res.status(200).json({ currentlyPlaying: response.data });
        } catch (error: any) {
            this.logger.error(
                "Error fetching current song",
                error.response?.data || error.message,
            );
            return next(error);
        }
    };

    startPlayback = async (req: Request, res: Response, next: NextFunction) => {
        const { trackUri } = req.body;

        if (!trackUri) {
            return res
                .status(400)
                .json({ error: "trackUri is required in body" });
        }

        this.logger.info(`Starting playback for: ${trackUri}`);

        try {
            await axios.put(
                "https://api.spotify.com/v1/me/player/play",
                { uris: [trackUri] },
                {
                    headers: {
                        Authorization: `Bearer ${Config.ACCESS_TOKEN}`,
                        "Content-Type": "application/json",
                    },
                },
            );

            res.status(200).json({ message: "Playback started" });
        } catch (error: any) {
            this.logger.error(
                "Error starting playback",
                error.response?.data || error.message,
            );
            return next(error);
        }
    };

    stopPlayback = async (req: Request, res: Response, next: NextFunction) => {
        this.logger.info("Stopping current playback");

        try {
            await axios.put(
                "https://api.spotify.com/v1/me/player/pause",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${Config.ACCESS_TOKEN}`,
                    },
                },
            );

            res.status(200).json({ message: "Playback stopped" });
        } catch (error: any) {
            this.logger.error(
                "Error stopping playback",
                error.response?.data || error.message,
            );
            return next(error);
        }
    };
}
