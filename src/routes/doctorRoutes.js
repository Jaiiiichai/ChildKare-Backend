// routes/parentRoutes.js
const express = require('express');
const router = express.Router();
const DoctorController = require('../controllers/doctorController');
const authMiddleware = require("../middlewares/authMiddleware");

// Apply the middleware here:
router.post('/createDoctor', authMiddleware, DoctorController.createUser);
router.get('/getAllDoctors', DoctorController.getAllDoctors);
router.get('/getDoctorById',authMiddleware, DoctorController.getDoctorByIdFromToken);
router.get('/getDoctorById/:id', authMiddleware, DoctorController.getDoctorByIdFromParams); // Assuming you want to get by user ID

module.exports = router;
