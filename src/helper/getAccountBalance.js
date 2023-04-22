const AccountModel = require("../models/accountModel");

const getAccountBalance = async (doctor_id) => {
  const response = await AccountModel.findOne({ doctor: doctor_id });
  return response.balance;
};

module.exports = getAccountBalance;
