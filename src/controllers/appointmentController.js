const AppointmentService = require('../services/AppointmentServices');
const ParentProfile = require('../models/ParentModel'); // Adjust the path as necessary
const DoctorProfile = require('../models/DoctorModel'); // Adjust the path as necessary
const AppointmentController = {
    createAppointment: async (req, res) => {
        try {
            const userId = req.user.id;
            console.log('User ID:', userId); // Log the user ID for debugging

                // Fetch the parent profile ID based on user ID
                const parentProfile = await ParentProfile.findOne({ where: { user_id: userId } });

                if (!parentProfile) {
                    return res.status(404).json({ error: 'Parent profile not found' });
                }

            const appointmentData = {
                parent_id: parentProfile.id,
                doctor_id: req.body.doctor_id,
                appointment_date: req.body.appointment_date,
                reason: req.body.reason,
                status: req.body.status || 'pending',
            };

            const appointment = await AppointmentService.createAppointment(appointmentData);
            res.status(201).json(appointment);
        } catch (error) {
            console.error('Error creating appointment:', error);
            res.status(500).json({ error: 'Error creating appointment' });
        }
    },

    getAppointments: async (req, res) => {
        try {
            const appointments = await AppointmentService.getAllAppointments();
            res.status(200).json(appointments);
        } catch (error) {
            console.error('Error fetching appointments:', error);
            res.status(500).json({ error: 'Error fetching appointments' });
        }
    },

    getAppointmentsByUserId: async (req, res) => {
        try {
            const userId = req.user.id;
    
            // Get parent profile based on the logged-in user ID
            const parentProfile = await ParentProfile.findOne({ where: { user_id: userId } });
    
            if (!parentProfile) {
                return res.status(404).json({ error: 'Parent profile not found' });
            }
    
            // Fetch appointments using parent_id
            const appointments = await AppointmentService.getAppointmentsByParentId(parentProfile.id);
    
            if (!appointments || appointments.length === 0) {
                return res.status(404).json({ error: 'No appointments found for this parent' });
            }
    
            res.status(200).json(appointments);
        } catch (error) {
            console.error('Error fetching appointments by user ID:', error);
            res.status(500).json({ error: 'Error fetching appointments' });
        }
    },
    getAppointmentsByDoctorId: async (req, res) => {
        try {
            const userId = req.user.id;
    
            // Get parent profile based on the logged-in user ID
            const doctorProfile = await DoctorProfile.findOne({ where: { user_id: userId } });
    
            if (!doctorProfile) {
                return res.status(404).json({ error: 'Parent profile not found' });
            }
    
            // Fetch appointments using parent_id
            const appointments = await AppointmentService.getAppointmentsByDoctorId(doctorProfile.id);
    
            if (!appointments || appointments.length === 0) {
                return res.status(404).json({ error: 'No appointments found for this parent' });
            }
    
            res.status(200).json(appointments);
        } catch (error) {
            console.error('Error fetching appointments by user ID:', error);
            res.status(500).json({ error: 'Error fetching appointments' });
        }
    },
    

    updateAppointment: async (req, res) => {
        try {
            
            const updated = await AppointmentService.updateAppointment(req.params.id, req.body);
            res.status(200).json(updated);
        } catch (error) {
            console.error('Error updating appointment:', error);
            res.status(500).json({ error: 'Error updating appointment' });
        }
    },

    deleteAppointment: async (req, res) => {
        try {
            await AppointmentService.deleteAppointment(req.params.id);
            res.status(200).send();
        } catch (error) {
            console.error('Error deleting appointment:', error);
            res.status(500).json({ error: 'Error deleting appointment' });
        }
    },
};

module.exports = AppointmentController;
