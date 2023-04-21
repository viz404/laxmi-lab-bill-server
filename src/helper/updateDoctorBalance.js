const DoctorModel = require("../models/doctorModel");

const updateDoctorBalance = async (id, amount) => {
  if (!id) {
    throw new Error("no id recieved");
  }

  if (!amount) {
    throw new Error("no id recieved");
  }

  const response = await DoctorModel.findByIdAndUpdate(
    id,
    { $inc: { balance: amount } },
    { new: true }
  );
  return response.balance;
};

module.exports = updateDoctorBalance;
