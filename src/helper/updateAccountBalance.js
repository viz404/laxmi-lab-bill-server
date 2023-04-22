const AccountModel = require("../models/accountModel");

const updateAccountBalance = async (doctor_id, amount) => {
  if (!doctor_id) {
    throw new Error("no id recieved");
  }

  if (!amount) {
    throw new Error("no amount recieved");
  }

  const response = await AccountModel.findOneAndUpdate(
    {
      doctor: doctor_id,
    },
    {
      $inc: { balance: amount },
    },
    { new: true }
  );

  return response.balance;
};

module.exports = updateAccountBalance;
