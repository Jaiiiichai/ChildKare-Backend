const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const DoctorProfile = sequelize.define('doctor_profile', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      specialization: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      license_number: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      contact_number: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      clinic_address: {
        type: DataTypes.TEXT,
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
        profilePicture: {
          type: DataTypes.STRING(255),
          allowNull: false,
      },
    }, {
      tableName: 'doctor_profile',
      timestamps: false,
    });

    DoctorProfile.associate = (models) => {
      DoctorProfile.hasMany(models.appointment, {
        foreignKey: 'doctor_id',
        as: 'appointments',
      });
    
      DoctorProfile.belongsTo(models.user, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
      });
    };
    

module.exports = DoctorProfile;