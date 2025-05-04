const ChatMessage = require('../models/ChatMessages'); // adjust path if needed
const User = require('../models/UserModel'); // make sure to import the correct User model (Doctor, Parent, etc.)
const { Op } = require('sequelize');
const Doctor = require('../models/DoctorModel'); // Import the Doctor model

const ChatService = {
  // Save a new chat message
  sendMessage: async (chatData) => {
    return await ChatMessage.create({
      sender_id: chatData.sender_id,
      receiver_id: chatData.receiver_id,
      message: chatData.message,
    });
  },

  // Get chat history between two users
  getChatHistory: async (userAId, userBId) => {
    return await ChatMessage.findAll({
      where: {
        [Op.or]: [
          { sender_id: userAId, receiver_id: userBId },
          { sender_id: userBId, receiver_id: userAId },
        ],
      },
      order: [['created_at', 'ASC']],
    });
  },

  // Get list of users the client has chatted with
  getConversationUsers: async (userId) => {
    // Fetch all chat messages involving the user
    const messages = await ChatMessage.findAll({
        where: {
            [Op.or]: [
                { sender_id: userId },
                { receiver_id: userId },
            ],
        },
        attributes: ['sender_id', 'receiver_id'],
    });

    // Collect unique user IDs from the messages
    const userIds = new Set();
    messages.forEach(msg => {
        if (msg.sender_id !== userId) userIds.add(msg.sender_id);
        if (msg.receiver_id !== userId) userIds.add(msg.receiver_id);
    });

    // Fetch doctor details from the Doctor model using user_id
    const doctors = await Doctor.findAll({
        where: {
            user_id: {
                [Op.in]: Array.from(userIds),
            },
        },
        attributes: ['user_id', 'first_name', 'last_name'], // Add more fields if needed
    });

    return doctors;
}

};

module.exports = ChatService;
