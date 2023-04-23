const JobModel = require("../models/jobModel");

const getJobsByDoctorId = async (id) => {
  return await JobModel.find({ doctor: id });
};

module.exports = getJobsByDoctorId;
