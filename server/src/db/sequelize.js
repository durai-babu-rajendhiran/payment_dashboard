// db/sequelize.js
const { Sequelize } = require('sequelize');
const path = require('path');
const fs = require('fs');

const sequelize = new Sequelize('payment_system', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: console.log, 
});

const models = {};
const modelsPath = path.join(__dirname, '../v1/models');

fs.readdirSync(modelsPath).forEach((file) => {
  if (file.endsWith('.js')) {
    const model = require(path.join(modelsPath, file))(sequelize, Sequelize.DataTypes);
    models[model.name] =  model;
  }
});

// Sync all models with the database
sequelize.sync({ alter: true }) // Use alter to update the schema with changes
  .then(() => {
    console.log('Database & tables synced with the latest models!', models);
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });

module.exports = { sequelize, models };
