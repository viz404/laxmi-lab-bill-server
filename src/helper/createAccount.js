const AccountModel = require("../models/accountModel");

const incrementCount = require("./incrementCount");

const createAccount = async (doctor_id) => {
  if (!doctor_id) {
    throw new Error("no doctor id recieved");
  }

  const _id = await incrementCount("account_id");
  await AccountModel.create({ _id, doctor: doctor_id, balance: 0 });
};

module.exports = createAccount;
