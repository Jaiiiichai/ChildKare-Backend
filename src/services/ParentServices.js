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
    },
    updateParentProfile: async(id,updateData) => {
        const parent = await Parent.findOne({ where: { user_id: id } });
        if (!parent) throw new Error('Doctor not found');
        return await parent.update(updateData);
      }

};

module.exports = ParentService;
