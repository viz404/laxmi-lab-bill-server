const PaymentModel = require("../models/paymentModel");

const incrementCount = require("../helper/incrementCount");
const updateAccountBalance = require("../helper/updateAccountBalance");
const createTransaction = require("../helper/createTransaction");

const addPayment = async (req, res) => {
  try {
    const payment = req.body;

    const _id = await incrementCount("payment_id");

    const response = await PaymentModel.create({ _id, ...payment });

    const updatedBalance = await updateAccountBalance(
      response.doctor,
      -response.amount
    );

    const transactionParticular = `Payment ${response.mode}, ID: ${_id}`;

    await createTransaction({
      doctorId: response.doctor,
      balance: updatedBalance,
      particular: transactionParticular,
      paymentId: _id,
    });

    return res.json({ response, status: true });
  } catch (error) {
    console.log(error);
    res.status(500);
    return res.json({ error: error.message, status: false });
  }
};

module.exports = { addPayment };
