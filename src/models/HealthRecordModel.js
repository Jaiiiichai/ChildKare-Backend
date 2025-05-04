const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const HealthRecord = sequelize.define('health_record', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  child_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  record_type_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  record_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  updated_by: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  tableName: 'health_record',
  timestamps: false,
});

HealthRecord.associate = (models) => {
  HealthRecord.belongsTo(models.RecordType, {
    foreignKey: 'record_type_id',
    as: 'record_type',
  });
};

module.exports = HealthRecord;
