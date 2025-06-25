const { models } = require('../../db/sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { successResponse, errorResponse } = require("../utils/status");
const { validateInput } = require("../utils/validate");
const {createJwtToken} = require("../middlewares/CheckUser")
// Helper function for input validation


exports.AddUser = async (req, res) => {
  try {
    const { name, email, password, role = 'user' } = req.body;
    
    // Validate input
    const error = validateInput(req.body, ['name', 'email', 'password']);
    if (error) {
      return errorResponse(error, res, 400);
    }

    // Check for existing user
    const existingUser = await models.User.findOne({ where: { email } });
    if (existingUser) {
      return errorResponse('User already exists', res, 409);
    }

    // Create user
    const hashedPassword = await bcrypt.hash(password, process.env.BCRYPT_SALT_ROUNDS || 10);
    const newUser = await models.User.create({ 
      name, email, password: hashedPassword, role 
    });
    const { password: _, ...userData } = newUser.get();
    return successResponse(userData, res, 201);
  } catch (error) {
    console.error('AddUser error:', error);
    const message = error.name === 'SequelizeValidationError' 
      ? error.errors.map(e => e.message).join(', ')
      : 'Internal Server Error';
    return errorResponse(message, res, 500);
  }
};

exports.CheckLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Basic validation
    if (!email || !password) {
      return errorResponse('Email and password required', res, 400);
    }

    // Find user with role
    const user = await models.User.findOne({
      where: { email }});

    // Validate credentials
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return errorResponse('Invalid credentials', res, 401);
    }

    // Generate token
    const token = createJwtToken({ userId: user.id, email: user.email, name: user.name });

    const response = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      token,
      expiresIn: 86400
    };

    return successResponse(response, res, 200, 'Login successful');
  } catch (error) {
    console.error('CheckLogin error:', error);
    return errorResponse('Internal Server Error', res, 500);
  }
};