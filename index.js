const express = require('express');
const http = require('http'); // <-- required for Socket.IO
const { Server } = require('socket.io');
const sequelize = require('./src/config/db');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./src/routes/userRoutes');
const ParentRoutes = require('./src/routes/parentRoutes');
const DoctorRoutes = require('./src/routes/doctorRoutes');
const ChildRoutes = require('./src/routes/childRoutes');
const AppointmentRoutes = require('./src/routes/appointmentRoutes');
const HealthRecordRoutes = require('./src/routes/healthRecordRoutes');
const ChatRoutes = require('./src/routes/chatRoutes');

const app = express();
const server = http.createServer(app); // Create HTTP server
const io = new Server(server, {
  cors: {
    origin: '*', // Replace with frontend domain in production
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

app.use(express.json());
app.use(cors({
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Socket.IO logic
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Join room based on user id (for 1-on-1 chat)
  socket.on('join', ({ userId }) => {
    socket.join(userId);
    console.log(`User ${userId} joined their room`);
  });
  

  // Handle sending message
  socket.on('send_message', (data) => {
    const { sender_id, receiver_id, message, created_at } = data;
  
    console.log(`Sending message to room: ${receiver_id}`);
    io.to(receiver_id).emit('receive_message', {
      sender_id,
      message,
      created_at,
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

sequelize.authenticate()
  .then(() => console.log('Database connected!'))
  .catch((err) => console.error('Database connection error:', err));

// REST API Routes
app.use('/api', userRoutes);
app.use('/api', ParentRoutes);
app.use('/api', DoctorRoutes);
app.use('/api', ChildRoutes);
app.use('/api', AppointmentRoutes);
app.use('/api', HealthRecordRoutes);
app.use('/api', ChatRoutes);

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
