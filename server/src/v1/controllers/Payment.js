const { models } = require('../../db/sequelize');
const { successResponse, errorResponse } = require("../utils/status");
const { validateInput } = require("../utils/validate");

exports.AddPayment = async (req, res) => {
  try {
    const { amount, description } = req.body;

    const error = validateInput(req.body, ['amount','description']);
    if (error) return errorResponse(error, res, 400);

    const newPayment = await models.Payment.create({ amount, description });
    return successResponse(newPayment, res, 201, 'Payment created successfully');
  } catch (error) {
    console.error('AddPayment error:', error);
    return errorResponse('Internal Server Error', res, 500);
  }
};

exports.GetPayments = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const { rows, count } = await models.Payment.findAndCountAll({
      offset: parseInt(offset),
      limit: parseInt(limit),
      order: [['createdAt', 'DESC']],
    });

    return successResponse({
      payments: rows,
      currentPage: parseInt(page),
      totalPages: Math.ceil(count / limit),
      totalRecords: count,
    }, res, 200);
  } catch (error) {
    console.error('GetPayments error:', error);
    return errorResponse('Internal Server Error', res, 500);
  }
};

exports.UpdatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, description } = req.body;

    const payment = await models.Payment.findByPk(id);
    if (!payment) return errorResponse('Payment not found', res, 404);

    await payment.update({ amount, description });
    return successResponse(payment, res, 200, 'Payment updated successfully');
  } catch (error) {
    console.error('UpdatePayment error:', error);
    return errorResponse('Internal Server Error', res, 500);
  }
};

exports.DeletePayment = async (req, res) => {
  try {
    const { id } = req.params;

    const payment = await models.Payment.findByPk(id);
    if (!payment) return errorResponse('Payment not found', res, 404);

    await payment.destroy();
    return successResponse({}, res, 200, 'Payment deleted successfully');
  } catch (error) {
    console.error('DeletePayment error:', error);
    return errorResponse('Internal Server Error', res, 500);
  }
};
