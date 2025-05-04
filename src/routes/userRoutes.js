// src/routes/UserRoutes.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const authMiddleware = require("../middlewares/authMiddleware");

router.get('/', UserController.getUsers);
//router.get('/:id', UserController.getUser);
router.post('/', UserController.createUser);
router.delete('/:id', UserController.deleteUser);
router.post('/login', UserController.login);
router.get('/profile', authMiddleware, UserController.getUserById);
router.get('/user/:id', UserController.getUserById);


// Replace this one with something else, like "/welcome"
router.get("/welcome", authMiddleware, (req, res) => {
    res.json({ success: true, message: "Welcome!", user: req.user });
});

module.exports = router;
