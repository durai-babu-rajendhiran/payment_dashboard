const { models,sequelize } = require('../../db/sequelize');
const { successResponse, errorResponse } = require('../utils/status');
const { validateInput } = require('../utils/validate');

// Add new account
exports.AddAccount = async (req, res) => {
  try {
    const { name, balance = 0 } = req.body;

    const error = validateInput(req.body, ['name']);
    if (error) return errorResponse(error, res, 400);

    const newAccount = await models.Account.create({ name, balance });

    return successResponse(newAccount, res, 201, 'Account created successfully');
  } catch (error) {
    console.error('AddAccount error:', error);
    return errorResponse('Internal Server Error', res, 500);
  }
};

// Get paginated list
exports.GetAccounts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const { rows, count } = await models.Account.findAndCountAll({
      offset: parseInt(offset),
      limit: parseInt(limit),
      order: [['createdAt', 'DESC']],
    });

    return successResponse({
      accounts: rows,
      currentPage: parseInt(page),
      totalPages: Math.ceil(count / limit),
      totalRecords: count,
    }, res, 200);
  } catch (error) {
    console.error('GetAccounts error:', error);
    return errorResponse('Internal Server Error', res, 500);
  }
};

// Update account
exports.UpdateAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, balance } = req.body;

    const account = await models.Account.findByPk(id);
    if (!account) return errorResponse('Account not found', res, 404);

    await account.update({ name, balance });

    return successResponse(account, res, 200, 'Account updated successfully');
  } catch (error) {
    console.error('UpdateAccount error:', error);
    return errorResponse('Internal Server Error', res, 500);
  }
};

// Delete account
exports.DeleteAccount = async (req, res) => {
  try {
    const { id } = req.params;

    const account = await models.Account.findByPk(id);
    if (!account) return errorResponse('Account not found', res, 404);

    await account.destroy();

    return successResponse({}, res, 200, 'Account deleted successfully');
  } catch (error) {
    console.error('DeleteAccount error:', error);
    return errorResponse('Internal Server Error', res, 500);
  }
};

exports.GetDashBoard = async (req, res) => {
  try {
    const result = await models.Account.findAll({
      attributes: [
        [sequelize.fn('SUM', sequelize.col('balance')), 'totalBalance']
      ]
    });

    const total = result[0]?.dataValues?.totalBalance || 0;

    const account = await models.Account.findAll({
      order: [['createdAt', 'DESC']],
      limit: 5
    });

    return successResponse({ totalBalance: parseFloat(total), account }, res, 200);
  } catch (error) {
    console.error('GetTotalBalance error:', error);
    return errorResponse('Internal Server Error', res, 500);
  }
};