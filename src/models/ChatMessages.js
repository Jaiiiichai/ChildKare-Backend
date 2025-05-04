const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ChatMessage = sequelize.define('chat_messages', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    sender_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users', // assumes a 'users' table exists
            key: 'id',
        },
    },
    receiver_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'chat_messages',
    timestamps: false,
});

// Associations
ChatMessage.associate = (models) => {
    ChatMessage.belongsTo(models.users, {
        as: 'Sender',
        foreignKey: 'sender_id',
        onDelete: 'CASCADE',
    });
    ChatMessage.belongsTo(models.users, {
        as: 'Receiver',
        foreignKey: 'receiver_id',
        onDelete: 'CASCADE',
    });
};

module.exports = ChatMessage;
