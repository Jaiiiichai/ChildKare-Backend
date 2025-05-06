const DoctorService = require('../services/DoctorServices');

const DoctorController = {
  createUser: async (req, res) => {
    try {
      const user_id = req.user.id; 
      const profileData = {
        user_id: user_id,
        specialization: req.body.specialization,
        license_number: req.body.license_number,
        contact_number: req.body.contact_number,
        clinic_address: req.body.clinic_address,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
      };

      const doctor_profile = await DoctorService.createUser(profileData);

      res.status(201).json(doctor_profile);
    } catch (err) {
      console.error('Error creating doctor profile:', err);
      res.status(500).json({ error: 'Error creating doctor profile' });
    }
  },

  getAllDoctors: async (req, res) => {
    try {
      const doctors = await DoctorService.getAllDoctors();
      res.status(200).json(doctors);
    } catch (err) {
      console.error('Error fetching doctors:', err);
      res.status(500).json({ error: 'Failed to fetch doctors' });
    }
  },

  getDoctorByIdFromToken: async (req, res) => {
    try {
      const userId = req.user.id; // Get the logged-in user's ID
      const doctor = await DoctorService.getDoctorById(userId);
      if (!doctor) {
        return res.status(404).json({ error: 'Doctor not found' });
      }
      res.status(200).json(doctor);
    } catch (err) {
      console.error('Error fetching doctor by ID:', err);
      res.status(500).json({ error: 'Failed to fetch doctor by ID' });
    }
  },
  getDoctorByIdFromParams: async (req, res) => {
    try {
      const userId = req.params.id; // Get the user ID from the request parameters
      const doctor = await DoctorService.getDoctorById(userId);
      if (!doctor) {
        return res.status(404).json({ error: 'Doctor not found' });
      }
      res.status(200).json(doctor);
    } catch (err) {
      console.error('Error fetching doctor by ID:', err);
      res.status(500).json({ error: 'Failed to fetch doctor by ID' });
    }
  },
  updateDoctor: async (req, res) => {
    try {
      const userId = req.user.id; // Get the user ID from the request parameters
      const updateData = req.body; // Get the data to update from the request body

      const updatedDoctor = await DoctorService.updateDoctor(userId, updateData);
      if (!updatedDoctor) {
        return res.status(404).json({ error: 'Doctor not found' });
      }
      res.status(200).json(updatedDoctor);
    } catch (err) {
      console.error('Error updating doctor:', err);
      res.status(500).json({ error: 'Failed to update doctor' });
    }
  },

};

module.exports = DoctorController;
