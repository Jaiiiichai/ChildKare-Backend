const ParentService = require('../services/ParentServices');

const ParentController = {
    createUser: async (req, res) => {
        try {
            const user_id = req.user.id; 
            const profileData = {
                user_id: user_id,
                contact_number: req.body.contact_number,
                location: req.body.location,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
            };

            const parentProfile = await ParentService.createUser(profileData);

            res.status(201).json(parentProfile);
        } catch (err) {
            console.error('Error creating parent profile:', err);
            res.status(500).json({ error: 'Error creating parent profile' });
        }
    },

    getUserProfileFromToken: async (req, res) => {

        try {
            const user_id = req.user.id;

            const parentProfile = await ParentService.getUserByUserId(user_id);

            if (!parentProfile) {
                return res.status(404).json({ error: 'Parent profile not found' });
            }

            res.status(200).json(parentProfile);
        } catch (err) {
            console.error('Error retrieving parent profile:', err);
            res.status(500).json({ error: 'Error retrieving parent profile' });
        }
    },
    getUserProfileFromParams: async (req, res) => {
        try {
            const userId = req.params.id; // Assuming the user ID is passed as a URL parameter

            const parentProfile = await ParentService.getUserByUserId(userId);

            if (!parentProfile) {
                return res.status(404).json({ error: 'Parent profile not found' });
            }

            res.status(200).json(parentProfile);
        } catch (err) {
            console.error('Error retrieving parent profile:', err);
            res.status(500).json({ error: 'Error retrieving parent profile' });
        }
    }
};

module.exports = ParentController;
