const Parent = require('../models/ParentModel'); // Ensure model is imported

const ParentService = {
    createUser: async (userData) => {
        const profile = await Parent.create({
            user_id: userData.user_id,
            contact_number: userData.contact_number,
            location: userData.location,
            first_name: userData.first_name,
            last_name: userData.last_name,
        });
        return profile;
    },

    getUserByUserId: async (user_id) => {
        const parentProfile = await Parent.findOne({ where: { user_id } });
        return parentProfile;
    }
};

module.exports = ParentService;
