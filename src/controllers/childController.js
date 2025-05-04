const ChildService = require('../services/ChildServices'); // Adjust the path as necessary

const ChildController = {
  createChild: async (req, res) => {
    try {
      const parent_id = req.user.id; // Assuming you’re using JWT and the user is logged in
      const childData = {
        parent_id: parent_id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        birthdate: req.body.birthdate,
        gender: req.body.gender,
        weight: req.body.weight
      };

      const newChild = await ChildService.createChild(childData);
      res.status(201).json(newChild);
    } catch (err) {
      console.error('Error creating child profile:', err);
      res.status(500).json({ error: 'Failed to create child profile' });
    }
  },

  getChildren: async (req, res) => {
    try {
      const parent_id = req.user.id;
      const children = await ChildService.getChildrenByParentId(parent_id);
      res.status(200).json(children);
    } catch (err) {
      console.error('Error retrieving children:', err);
      res.status(500).json({ error: 'Failed to fetch children' });
    }
  }
};

module.exports = ChildController;
