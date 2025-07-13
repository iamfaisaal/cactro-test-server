import express from "express";
import logger from "../config/logger";
import { SpotifyController } from "../controllers/SpotifyController";

const router = express.Router();

const spotifyController = new SpotifyController(logger);

/**
 * get all tracks endpoint
 */
router.get("/", spotifyController.getAll);

/**
 * get current song endpoint
 */
router.get("/current", spotifyController.getCurrent);

/**
 * play song endpoint
 */
router.put("/play", spotifyController.startPlayback);

/**
 * pause song endpoint
 */
router.put("/pause", spotifyController.stopPlayback);

export default router;
