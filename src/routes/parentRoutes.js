// routes/parentRoutes.js
const express = require('express');
const router = express.Router();
const ParentController = require('../controllers/parentController');
const authMiddleware = require("../middlewares/authMiddleware");

// Apply the middleware here:
router.post('/createParent', authMiddleware, ParentController.createUser);
router.get('/parentProfile', authMiddleware, ParentController.getUserProfileFromToken);
router.get('/parentProfile/:id', authMiddleware, ParentController.getUserProfileFromParams); // Assuming you want to get by user ID
router.put('/updateParent', authMiddleware, ParentController.updateParent); // Assuming you want to update by user ID



module.exports = router;
