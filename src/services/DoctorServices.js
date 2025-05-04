const Doctor = require('../models/DoctorModel'); // Import the Doctor model

const DoctorService = {
  createUser: async (userData) => {
    const profile = await Doctor.create({
      user_id: userData.user_id,
      specialization: userData.specialization,
      license_number: userData.license_number,
      contact_number: userData.contact_number,
      clinic_address: userData.clinic_address,
      first_name: userData.first_name,
      last_name: userData.last_name,
    });
    return profile;
  },

  getAllDoctors: async () => {
    return await Doctor.findAll();
  },

  getDoctorById: async (id) => {
    const doctor = await Doctor.findOne({ where: { user_id: id } });
    return doctor;
  },
};

module.exports = DoctorService;
