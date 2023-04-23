const DoctorModel = require("../models/doctorModel");

const getAccountBalance = async (doctor_id) => {
  const response = await DoctorModel.findById(doctor_id);
  return response.balance;
};

module.exports = getAccountBalance;
