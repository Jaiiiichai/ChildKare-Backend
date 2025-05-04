const ChildProfile = require('../models/ChildModel'); // adjust path as needed

const ChildService = {
  createChild: async (childData) => {
    const newChild = await ChildProfile.create({
      parent_id: childData.parent_id,
      first_name: childData.first_name,
      last_name: childData.last_name,
      birthdate: childData.birthdate,
      gender: childData.gender,
      weight: childData.weight
    });
    return newChild;
  },

  getChildrenByParentId: async (parentId) => {
    const children = await ChildProfile.findAll({
      where: { parent_id: parentId },
    });
    return children;
  } 
};

module.exports = ChildService;
