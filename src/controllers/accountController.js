const countDocuments = require("../helper/countDocuments");
const AccountModel = require("../models/accountModel");

const getAccounts = async (req, res) => {
  try {
    const { _limit = 10, _page = 1, doctor_name } = req.query;
    const skip = _page > 0 ? (_page - 1) * _limit : 0;

    let filters = {};

    if (doctor_name) {
      filters.doctorName = { $regex: new RegExp(doctor_name, "i") };
    }

    const response = await AccountModel.find(filters)
      .skip(skip)
      .limit(_limit)
      .sort({ balance: -1 })
      .populate("doctor");

    const count = await countDocuments(AccountModel);

    res.set("X-Total-Count", count);

    return res.json({ response, status: true });
  } catch (error) {
    console.log(error);
    res.status(500);
    return res.json({ error: error.message, status: false });
  }
};

const getAccountByDoctorId = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const response = await AccountModel.findOne({ doctor: doctorId });

    return res.json({ response, status: true });
  } catch (error) {
    console.log(error);
    res.status(500);
    return res.json({ error: error.message, status: false });
  }
};

module.exports = { getAccounts, getAccountByDoctorId };
