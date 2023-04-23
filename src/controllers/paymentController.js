const PaymentModel = require("../models/paymentModel");

const incrementCount = require("../helper/incrementCount");
const updateAccountBalance = require("../helper/updateAccountBalance");
const createTransaction = require("../helper/createTransaction");
const countDocuments = require("../helper/countDocuments");

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

const getPayments = async (req, res) => {
  try {
    const { _limit = 10, _page = 1, doctor_name } = req.query;
    const skip = _page > 0 ? (_page - 1) * _limit : 0;

    let filters = {};

    if (doctor_name) {
      filters.doctorName = { $regex: new RegExp(doctor_name, "i") };
    }

    const response = await PaymentModel.find(filters)
      .skip(skip)
      .limit(_limit)
      .sort({ date: -1 })
      .populate("doctor");

    const count = await countDocuments(PaymentModel);

    res.set("X-Total-Count", count);

    return res.json({ response, status: true });
  } catch (error) {
    console.log(error);
    res.status(500);
    return res.json({ error: error.message, status: false });
  }
};

module.exports = { addPayment, getPayments };
