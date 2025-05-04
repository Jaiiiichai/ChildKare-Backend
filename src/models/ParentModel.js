// models/ParentModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ParentProfile = sequelize.define('parent_profile', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  contact_number: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  location: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  first_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
    last_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
}, {
  tableName: 'parent_profile',
  timestamps: false,
});

module.exports = ParentProfile;
