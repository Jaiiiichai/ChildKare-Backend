const express = require('express');
const router = express.Router();
const ChatController = require('../controllers/chatController'); // Adjust the path as necessary
const authMiddleware = require('../middlewares/authMiddleware'); // Assuming JWT authentication

// Route to send a chat message
router.post('/send', authMiddleware, ChatController.sendMessage);

// Route to get chat history with a specific user
router.get('/history/:userId', authMiddleware, ChatController.getChatHistory);

// Route to get all users the authenticated user has chatted with
router.get('/conversations', authMiddleware, ChatController.getConversationUsers);

router.get('/conversationsForDoctors', authMiddleware, ChatController.getConversationUsersForDoctors);
module.exports = router;
