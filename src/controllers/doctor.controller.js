const countDocuments = require("../helper/countDocuments");
const DoctorModel = require("../models/doctor.model");

const addDoctor = async (req, res) => {
  try {
    const doctor = req.body;

    const response = await DoctorModel.create(doctor);

    return res.json({ response, status: true });
  } catch (error) {
    res.status(500);
    return res.json({ error: error.message, status: false });
  }
};

const getDoctors = async (req, res) => {
  try {
    const { _limit = 10, _page = 1, name } = req.query;
    const skip = _page > 0 ? (_page - 1) * _limit : 0;

    let filters = {};

    if (name) {
      filters.name = { $regex: new RegExp(name, "i") };
    }

    const response = await DoctorModel.find(filters).skip(skip).limit(_limit);

    const count = await countDocuments(DoctorModel);

    res.set("X-Total-Count", count);

    return res.json({ response, status: true });
  } catch (error) {
    res.status(500);
    return res.json({ error: error.message, status: false });
  }
};

const getDoctorById = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await DoctorModel.findById(id);

    return res.json({ response, status: true });
  } catch (error) {
    res.status(500);
    return res.json({ error: error.message, status: false });
  }
};

const deleteDoctorById = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await DoctorModel.findByIdAndDelete(id);

    return res.json({ response, status: true });
  } catch (error) {
    res.status(500);
    return res.json({ error: error.message, status: false });
  }
};

const updateDoctorById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedDoctor = req.body;

    const response = await DoctorModel.findByIdAndUpdate(id, updatedDoctor);

    return res.json({ response, status: true });
  } catch (error) {
    res.status(500);
    return res.json({ error: error.message, status: false });
  }
};

module.exports = {
  addDoctor,
  getDoctors,
  getDoctorById,
  deleteDoctorById,
  updateDoctorById,
};
