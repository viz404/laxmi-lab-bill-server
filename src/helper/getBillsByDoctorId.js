const BillModel = require("../models/billModel");

const getBillsByDoctorId = async (id) => {
  return await BillModel.find({ doctor: id });
};

module.exports = getBillsByDoctorId;
