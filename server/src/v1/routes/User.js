const express = require('express');
const router = express.Router();
const userController = require('../controllers/User');


/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User registered successfully
 *
 * /api/login:
 *   post:
 *     summary: User login
 *     tags: [User]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */

//user routes
router.post('/register', userController.AddUser);
router.post('/login', userController.CheckLogin);

module.exports = router;
