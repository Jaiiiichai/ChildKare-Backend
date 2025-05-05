const Appointment = require('../models/AppointmentModel'); // Adjust the path as necessary

const AppointmentServices = {
    createAppointment: async (appointmentData) => {
        const appointment = await Appointment.create({
          parent_id: appointmentData.parent_id,
          doctor_id: appointmentData.doctor_id,
          appointment_date: appointmentData.appointment_date,
          reason: appointmentData.reason,
          status: appointmentData.status || 'pending', // default to 'pending' if not provided
        });
      
        return appointment;
      },

    getAllAppointments: async () => {
        return await Appointment.findAll();
    },

    getAppointmentsByParentId: async (parentId) => {
        return await Appointment.findAll({
            where: {
                parent_id: parentId
            }
        });
    }
    ,

    updateAppointment: async (id, updateData) => {
        const appointment = await Appointment.findByPk(id);
        if (!appointment) throw new Error('Appointment not found');
        return await appointment.update(updateData);
    },

    deleteAppointment: async (id) => {
        const appointment = await Appointment.findByPk(id);
        if (!appointment) throw new Error('Appointment not found');
        return await appointment.destroy();
    }
};

module.exports = AppointmentServices;
