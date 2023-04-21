const BillModel = require("../models/billModel");

const getJobInstancesInBill = async (jobId) => {
  return await BillModel.find({ jobs: { $in: [jobId] } });
};

module.exports = getJobInstancesInBill;
