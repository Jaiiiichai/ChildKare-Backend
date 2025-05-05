const express = require('express');
const router = express.Router();
const AppointmentController = require('../controllers/appointmentController');
const authMiddleware = require("../middlewares/authMiddleware");

// Create new appointment
router.post('/createAppointment',authMiddleware,AppointmentController.createAppointment);

// Get all appointments
router.get('/getAppointments', AppointmentController.getAppointments);

// Get a specific appointment by ID
// ✅ Rename route and use the actual function name
router.get('/getAppointmentsByUserId', authMiddleware, AppointmentController.getAppointmentsByUserId);


// Update an appointment
router.put('/updateAppointment/:id', AppointmentController.updateAppointment);

// Delete an appointment
router.delete('/deleteAppointment/:id', AppointmentController.deleteAppointment);

module.exports = router;
