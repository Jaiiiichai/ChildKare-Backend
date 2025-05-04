// src/controllers/UserController.js
const UserService = require('../services/userServices');

const UserController = {
  getUsers: async (req, res) => {
    try {
      const users = await UserService.getAllUsers();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  },

  getUserById: async (req, res) => {
    try {
      const idFromToken = req.user?.id;         // Comes from the decoded token middleware
      const idFromParams = req.params?.id;      // Comes from route parameters (e.g., /api/user/:id)
  
      const userId = idFromParams || idFromToken; // Use param ID if available, otherwise fallback to token
  
      if (!userId) {
        return res.status(400).json({ error: 'User ID not provided' });
      }
  
      const user = await UserService.getUserById(userId); 
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json(user);
    } catch (err) {
      console.error("Error in getUserById:", err);
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  }
  ,
  

  createUser: async (req, res) => {
    try {
      const newUser = await UserService.createUser(req.body);
      res.status(201).json(newUser);
    } catch (err) {
      res.status(500).json({ error: 'Error creating user' });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const deleted = await UserService.deleteUser(req.params.id);
      if (deleted) {
        res.json({ message: 'User deleted' });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Error deleting user' });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const result = await UserService.loginUser(email, password);
      if (!result.success) {
        console.log(email, password);
        return res.status(401).json({ message: result.message });
      }
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = UserController;
