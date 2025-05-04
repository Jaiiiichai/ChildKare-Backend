const HealthRecord = require('../models/HealthRecordModel');
const ChildProfile = require('../models/ChildModel'); // Import ChildProfile model
const RecordType = require('../models/RecordTypeModel');

const createHealthRecord = async (data) => {
  return await HealthRecord.create(data);
};

// const getAllHealthRecords = async () => {
//   return await HealthRecord.findAll({ include: [{ model: RecordType, as: 'record_type' }]
//   });
// };

// const getHealthRecordById = async (id) => {
//   return await HealthRecord.findByPk(id, { include: [{ model: RecordType, as: 'record_type' }]
//   });
// };

const updateHealthRecord = async (id, updates) => {
  const record = await HealthRecord.findByPk(id);
  if (!record) throw new Error('Record not found');
  return await record.update(updates);
};

const deleteHealthRecord = async (id) => {
  const record = await HealthRecord.findByPk(id);
  if (!record) throw new Error('Record not found');
  return await record.destroy();
};

module.exports = {
  createHealthRecord,
 // getAllHealthRecords,
//  getHealthRecordById,
  updateHealthRecord,
  deleteHealthRecord,
};
