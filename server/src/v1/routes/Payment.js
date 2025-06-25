const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/Payment');
const {getCurrentUser} =require('../middlewares/CheckUser')


/**
 * @swagger
 * /api/payment:
 *   post:
 *     summary: Add a new payment
 *     tags: [Payment]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accountId:
 *                 type: string
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Payment added
 *
 *   get:
 *     summary: Get all payments
 *     tags: [Payment]
 *     responses:
 *       200:
 *         description: List of payments
 */

/**
 * @swagger
 * /api/payment/{id}:
 *   put:
 *     summary: Update a payment
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment updated
 *
 *   delete:
 *     summary: Delete a payment
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment deleted
 */


// Payment routes
router.post('/payment',getCurrentUser, paymentController.AddPayment);
router.get('/payment',getCurrentUser, paymentController.GetPayments);
router.put('/payment/:id',getCurrentUser, paymentController.UpdatePayment);
router.delete('/payment/:id',getCurrentUser, paymentController.DeletePayment);

module.exports = router;
