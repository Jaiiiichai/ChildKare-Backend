const express = require('express');
const router = express.Router();
const ChildController = require('../controllers/childController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/createChild', authMiddleware, ChildController.createChild);
router.get('/children', authMiddleware, ChildController.getChildren);

module.exports = router;
