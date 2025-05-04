
const express = require('express');
const sequelize = require('./src/config/db'); 
const app = express();
require('dotenv').config();
const userRoutes = require('./src/routes/userRoutes');
const ParentRoutes = require('./src/routes/parentRoutes');
const DoctorRoutes = require('./src/routes/doctorRoutes');
const ChildRoutes = require('./src/routes/childRoutes');
const AppointmentRoutes = require('./src/routes/appointmentRoutes');
const HealthRecordRoutes = require('./src/routes/healthRecordRoutes');
const ChatRoutes = require('./src/routes/chatRoutes'); // Import chat routes
const cors = require('cors');

app.use(express.json());
app.use(cors({
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

sequelize.authenticate()
  .then(() => {
    console.log('Database connected!');
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });

  app.use('/api', userRoutes);
  app.use('/api', ParentRoutes);
  app.use('/api', DoctorRoutes);
  app.use('/api', ChildRoutes);
  app.use('/api', AppointmentRoutes);
  app.use('/api', HealthRecordRoutes);
  app.use('/api', ChatRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
