import express from "express";

import { requireSignIn } from "./../middlewares/authMiddleware.js";
import {
  loginController,
  registerController,
  testController,
} from "../controllers/authController.js";

//router object
const router = express.Router();

//routing
//Register || METHOD POST
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication routes
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type:string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: User already exists
 */
router.post("/register", registerController);

//Login || METHOD POST
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Invalid username or password
 */
router.post("/login", loginController);

//protected ROute || METHOD GET

/**
 * @swagger
 * /auth/test:
 *   get:
 *     summary: Test protected route
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Access granted
 *       401:
 *         description: Access denied
 */
router.get("/test", requireSignIn, testController);

export default router;
