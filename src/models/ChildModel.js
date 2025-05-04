const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ChildProfile = sequelize.define('child_profile', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    parent_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    first_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    birthdate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    gender: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    weight: {
        type: DataTypes.DECIMAL(5, 2), // e.g., 23.45 kg
        allowNull: false,
    },
}, {
    tableName: 'child_profile',
    timestamps: false,
});

ChildProfile.associate = (models) => {
    ChildProfile.belongsTo(models.user, {
        foreignKey: 'parent_id',
        onDelete: 'CASCADE',
    });
};

module.exports = ChildProfile;
