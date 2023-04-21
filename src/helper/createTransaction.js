const TransactionModel = require("../models/transactionModel");
const incrementCount = require("./incrementCount");

const createTransaction = async ({
  doctorId,
  balance,
  particular,
  billId,
  paymentId,
}) => {
  if (!doctorId || !balance || !particular) {
    throw new Error("Incomplete details");
  }

  if (!billId && !paymentId) {
    throw new Error("Incomplete details");
  }

  const _id = await incrementCount("transaction_id");

  const transactionObj = {
    _id,
    doctor: doctorId,
    balance,
    particular,
  };

  if (billId) {
    transactionObj.bill = billId;
  }

  if (paymentId) {
    transactionObj.payment = paymentId;
  }

  await TransactionModel.create(transactionObj);
};

module.exports = createTransaction;
