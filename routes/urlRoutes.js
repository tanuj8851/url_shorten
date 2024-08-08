import express from "express";

import { requireSignIn } from "./../middlewares/authMiddleware.js";
import {
  generateShortUrl,
  redirectUrlController,
} from "../controllers/urlController.js";

//router object
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: URL
 *   description: URL shortening routes
 */

/**
 * @swagger
 * /url/create:
 *   post:
 *     summary: Shorten a URL
 *     tags: [URL]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               originalUrl:
 *                 type: string
 *     responses:
 *       201:
 *         description: URL shortened successfully
 *       500:
 *         description: Internal server error
 */
router.post("/create", requireSignIn, generateShortUrl);

/**
 * @swagger
 * /url/:shortId:
 *   get:
 *     summary: Redirect to the original URL
 *     tags: [URL]
 *     parameters:
 *       - in: path
 *         name: shortId
 *         schema:
 *           type: string
 *         required: true
 *         description: Short URL ID
 *     responses:
 *       302:
 *         description: Redirecting to the original URL
 *       404:
 *         description: URL not found
 */
router.get("/:shortId", requireSignIn, redirectUrlController);

export default router;
