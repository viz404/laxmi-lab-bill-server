const WorkModel = require("../models/work.model");

const getWorkTypes = async (req, res) => {
  try {
    const response = await WorkModel.find();
    return res.json({ response, status: true });
  } catch (error) {
    res.status(500);
    return res.json({ error: error.message, status: false });
  }
};

const addWorkType = async (req, res) => {
  try {
    const { title } = req.body;

    const response = await WorkModel.create({ title });

    return res.json({ response, status: true });
  } catch (error) {
    res.status(500);
    return res.json({ error: error.message, status: false });
  }
};

const deleteWorkType = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await WorkModel.findByIdAndDelete(id);

    return res.json({ response, status: true });
  } catch (error) {
    res.status(500);
    return res.json({ error: error.message, status: false });
  }
};

module.exports = { getWorkTypes, addWorkType, deleteWorkType };
