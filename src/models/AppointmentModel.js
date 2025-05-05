const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Appointment = sequelize.define('appointment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    parent_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'parent_profile', // Ensure this matches the table name
            key: 'id',
        },
    },
    doctor_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'doctor_profile', // Ensure this matches the table name
            key: 'id',
        },
    },
    appointment_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    reason: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    status: {
        type: DataTypes.STRING(10),
        allowNull: true,
        validate: {
            isIn: [['pending', 'approved', 'declined', 'completed']],
        },
    },
}, {
    tableName: 'appointment',
    timestamps: false,
});

// Associations
Appointment.associate = (models) => {
    Appointment.belongsTo(models.parent_profile, {
        foreignKey: 'parent_id',
        onDelete: 'CASCADE',
    });
    Appointment.belongsTo(models.doctor_profile, {
        foreignKey: 'doctor_id',
        onDelete: 'CASCADE',
    });
};

module.exports = Appointment;
