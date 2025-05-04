const healthRecordService = require('../services/HealthRecordServices');

const create = async (req, res) => {
  try {
    const record = await healthRecordService.createHealthRecord(req.body);
    res.status(201).json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// const getAll = async (req, res) => {
//   try {
//     const records = await healthRecordService.getAllHealthRecords();
//     res.json(records);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// const getById = async (req, res) => {
//   try {
//     const record = await healthRecordService.getHealthRecordById(req.params.id);
//     if (!record) return res.status(404).json({ error: 'Record not found' });
//     res.json(record);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

const update = async (req, res) => {
  try {
    const record = await healthRecordService.updateHealthRecord(req.params.id, req.body);
    res.json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const remove = async (req, res) => {
  try {
    await healthRecordService.deleteHealthRecord(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { create,
   //getAll, getById, 
   update, remove };
