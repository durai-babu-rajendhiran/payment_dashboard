const express = require('express');
const router = express.Router();
const accountController = require('../controllers/Account');
const {getCurrentUser} =require('../middlewares/CheckUser')



/**
 * @swagger
 * tags:
 *   - name: Account
 *   - name: Payment
 *   - name: User
 */

/**
 * @swagger
 * /api/account:
 *   post:
 *     summary: Add a new account
 *     tags: [Account]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, balance]
 *             properties:
 *               name:
 *                 type: string
 *               balance:
 *                 type: number
 *     responses:
 *       200:
 *         description: Account added successfully
 *
 *   get:
 *     summary: Get all accounts
 *     tags: [Account]
 *     responses:
 *       200:
 *         description: List of accounts
 */

/**
 * @swagger
 * /api/account/{id}:
 *   put:
 *     summary: Update an account
 *     tags: [Account]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               balance:
 *                 type: number
 *     responses:
 *       200:
 *         description: Account updated successfully
 *
 *   delete:
 *     summary: Delete an account
 *     tags: [Account]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Account deleted
 */

/**
 * @swagger
 * /api/dashboard:
 *   get:
 *     summary: Get dashboard summary
 *     tags: [Account]
 *     responses:
 *       200:
 *         description: Dashboard summary
 */

router.post('/account',getCurrentUser, accountController.AddAccount);
router.get('/account',getCurrentUser, accountController.GetAccounts);
router.put('/account/:id',getCurrentUser, accountController.UpdateAccount);
router.delete('/account/:id',getCurrentUser, accountController.DeleteAccount);
router.get('/dashboard',getCurrentUser,accountController.GetDashBoard);

module.exports = router;
