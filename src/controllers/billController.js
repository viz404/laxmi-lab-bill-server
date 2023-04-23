const BillModel = require("../models/billModel");

const countDocuments = require("../helper/countDocuments");
const incrementCount = require("../helper/incrementCount");
const updateAccountBalance = require("../helper/updateAccountBalance");
const createTransaction = require("../helper/createTransaction");
const getAccountBalance = require("../helper/getAccountBalance");

const addBill = async (req, res) => {
  try {
    const bill = req.body;

    const previousBalance = await getAccountBalance(bill.doctor);

    bill.previousBalance = previousBalance;

    const _id = await incrementCount("bill_id", 101);

    const response = await BillModel.create({ _id, ...bill });

    const updatedBalance = await updateAccountBalance(
      response.doctor,
      response.totalAmount
    );

    const fromDate = new Intl.DateTimeFormat("en-IN").format(response.fromDate);
    const tillDate = new Intl.DateTimeFormat("en-IN").format(response.tillDate);

    const transactionParticular = `Bill no. ${_id}, from ${fromDate} - till ${tillDate}`;

    await createTransaction({
      doctorId: response.doctor,
      balance: updatedBalance,
      particular: transactionParticular,
      billId: _id,
    });

    return res.json({ response, status: true });
  } catch (error) {
    console.log(error);
    res.status(500);
    return res.json({ error: error.message, status: false });
  }
};

const getBills = async (req, res) => {
  try {
    const {
      _limit = 10,
      _page = 1,
      doctor_id,
      start_date,
      end_date,
    } = req.query;
    const skip = _page > 0 ? (_page - 1) * _limit : 0;

    let filters = {};

    if (doctor_id) {
      filters.doctor = doctor_id;
    }

    if (start_date && end_date) {
      let startDate = new Date(start_date);
      let endDate = new Date(end_date);

      filters.createdAt = { $gte: startDate, $lte: endDate };
    }

    const response = await BillModel.find(filters)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(_limit)
      .populate(["doctor", "jobs"]);

    const count = await countDocuments(BillModel);

    res.set("X-Total-Count", count);

    return res.json({ response, status: true });
  } catch (error) {
    console.log(error);
    res.status(500);
    return res.json({ error: error.message, status: false });
  }
};

const getBillById = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await BillModel.findById(id).populate(["doctor", "jobs"]);

    return res.json({ response, status: true });
  } catch (error) {
    console.log(error);
    res.status(500);
    return res.json({ error: error.message, status: false });
  }
};

const deleteBillById = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await BillModel.findByIdAndDelete(id);

    return res.json({ response, status: true });
  } catch (error) {
    console.log(error);
    res.status(500);
    return res.json({ error: error.message, status: false });
  }
};

module.exports = { addBill, getBills, getBillById, deleteBillById };
