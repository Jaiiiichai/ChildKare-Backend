const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const RecordType = sequelize.define('record_type', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false,
  },
}, {
  tableName: 'record_type',
  timestamps: false,
});

RecordType.associate = (models) => {
  RecordType.hasMany(models.HealthRecord, {
    foreignKey: 'record_type_id',
  });
};

module.exports = RecordType;
