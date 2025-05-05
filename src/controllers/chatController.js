const ChatService = require('../services/ChatServices'); // Adjust the path as necessary

const ChatController = {
  // Send a chat message
  sendMessage: async (req, res) => {
    try {
      const sender_id = req.user.id; // Assumes user is authenticated
      const { receiver_id, message } = req.body;

      const chatData = {
        sender_id,
        receiver_id,
        message,
      };

      const newMessage = await ChatService.sendMessage(chatData);
      res.status(201).json(newMessage);
    } catch (err) {
      console.error('Error sending message:', err);
      res.status(500).json({ error: 'Failed to send message' });
    }
  },

  // Get chat history between the authenticated user and another user
  getChatHistory: async (req, res) => {
    try {
      const userAId = req.user.id;
      const userBId = parseInt(req.params.userId);

      const history = await ChatService.getChatHistory(userAId, userBId);
      res.status(200).json(history);
    } catch (err) {
      console.error('Error retrieving chat history:', err);
      res.status(500).json({ error: 'Failed to fetch chat history' });
    }
  },

  // Get all users the authenticated user has conversations with
  getConversationUsers: async (req, res) => {
    try {
      const userId = req.user.id;
      const users = await ChatService.getConversationUsers(userId);
      res.status(200).json(users);
    } catch (err) {
      console.error('Error fetching conversation users:', err);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  },
  getConversationUsersForDoctors: async (req, res) => {
    try {
      const userId = req.user.id;
      const users = await ChatService.getConversationUsersForDoctors(userId);
      res.status(200).json(users);
    } catch (err) {
      console.error('Error fetching conversation users:', err);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  }
};

module.exports = ChatController;
