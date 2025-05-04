// src/models/UserModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');  // Import the Sequelize instance

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,  // Automatically incrementing ID
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['parent', 'doctor']],  // Only 'parent' or 'doctor' roles allowed
    },
  },
}, {
  tableName: 'users',  // Ensure the table name matches your DB schema
  timestamps: false,   // No created_at or updated_at fields
});

module.exports = User;
