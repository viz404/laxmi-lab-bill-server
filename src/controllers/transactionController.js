const TransactionModel = require("../models/transactionModel");

const getTransactions = async (req, res) => {
  try {
    const doctor_id = req.params.doctorId;
    const { from_date, till_date } = req.query;

    if (!doctor_id || !from_date || !till_date) {
      res.status(400);
      return res.json({ error: "Incomplete details", status: false });
    }

    let filters = { doctor: doctor_id };

    let fromDate = new Date(from_date);
    let tillDate = new Date(till_date);

    filters.createdAt = { $gte: fromDate, $lte: tillDate };

    const response = TransactionModel.find(filters).populate("doctor");

    return res.json({ response, status: true });
  } catch (error) {
    console.log(error);
    res.status(500);
    return res.json({ error: error.message, status: false });
  }
};

module.exports = { getTransactions };
