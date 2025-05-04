// src/services/UserService.js
const bcrypt = require('bcrypt');
const User = require('../models/UserModel');
const jwt = require("jsonwebtoken");

const UserService = {
  createUser: async (userData) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    const newUser = await User.create({
      email: userData.email,
      password: hashedPassword,
      role: userData.role
    });

    return newUser;
  },

  getAllUsers: async () => await User.findAll(),

  getUserById: async (userId) => {
    const user = await User.findByPk(userId);
    return user;
  },

  deleteUser: async (id) => {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      return true;
    }
    return false;
  },
  
  loginUser: async (email, password) => {
    const user = await User.findOne({ where: { email } });
    if (!user) return { success: false, message: "User not found" };

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return { success: false, message: "Invalid credentials" };

    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role }, 
        process.env.JWT_SECRET, 
        { expiresIn: "1h" } 
    );

    return {
        success: true,
        user: {
            id: user.id,
            email: user.email,
            role: user.role
        },
        token
    };
  },
};

module.exports = UserService;
