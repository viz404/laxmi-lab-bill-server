const WorkModel = require("../models/workModel");

const incrementCount = require("../helper/incrementCount");

const getWorkTypes = async (req, res) => {
  try {
    const response = await WorkModel.find();
    return res.json({ response, status: true });
  } catch (error) {
    console.log(error);
    res.status(500);
    return res.json({ error: error.message, status: false });
  }
};

const addWorkType = async (req, res) => {
  try {
    const { title } = req.body;

    const _id = await incrementCount("work_id");

    if (!_id) {
      throw new Error("Work id increment failed");
    }

    const response = await WorkModel.create({ _id, title });

    return res.json({ response, status: true });
  } catch (error) {
    console.log(error);
    res.status(500);
    return res.json({ error: error.message, status: false });
  }
};

const updateWorkType = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    if (!title) {
      throw new Error("Please add a title");
    }

    const response = await WorkModel.findByIdAndUpdate(
      id,
      { title },
      { new: true }
    );

    return res.json({ response, status: true });
  } catch (error) {
    console.log(error);
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
    console.log(error);
    res.status(500);
    return res.json({ error: error.message, status: false });
  }
};

module.exports = { getWorkTypes, addWorkType, deleteWorkType, updateWorkType };
