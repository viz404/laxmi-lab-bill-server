const JobModel = require("../models/job.model");
const countDocuments = require("../helper/countDocuments");

const addJob = async (req, res) => {
  try {
    const job = req.body;

    const response = await JobModel.create(job);

    return res.json({ response, status: true });
  } catch (error) {
    res.status(500);
    return res.json({ error: error.message, status: false });
  }
};

const getJobs = async (req, res) => {
  try {
    const {
      doctor_id,
      from_date,
      till_date,
      _limit = 10,
      _page = 1,
      no_limit,
      job_number,
    } = req.query;

    const skip = _page > 0 ? (_page - 1) * _limit : 0;

    let filters = {};

    if (doctor_id) {
      filters.doctorId = doctor_id;
    }

    if (from_date && till_date) {
      let fromDate = new Date(from_date);
      let tillDate = new Date(till_date);

      filters.date = { $gte: fromDate, $lte: tillDate };
    }

    if (job_number) {
      filters.jobNumber = job_number;
    }

    let response = {};

    if (no_limit == "true") {
      response = await JobModel.find({ filters }).sort({ date: 1 });
    } else {
      response = await JobModel.find(filters)
        .sort({ date: -1 })
        .skip(skip)
        .limit(_limit);

      const count = await countDocuments(JobModel);

      res.set("X-Total-Count", count);
    }

    return res.json({ response, status: true });
  } catch (error) {
    res.status(500);
    return res.json({ error: error.message, status: false });
  }
};

const getJobById = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await JobModel.findById(id);

    return res.json({ response, status: true });
  } catch (error) {
    res.status(500);
    return res.json({ error: error.message, status: false });
  }
};

const updateJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedJob = req.body;

    const response = await JobModel.findByIdAndUpdate(id, updatedJob);

    return res.json({ response, status: true });
  } catch (error) {
    res.status(500);
    return res.json({ error: error.message, status: false });
  }
};

const deleteJobById = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await JobModel.findByIdAndDelete(id);

    return res.json({ response, status: true });
  } catch (error) {
    res.status(500);
    return res.json({ error: error.message, status: false });
  }
};

module.exports = {
  addJob,
  getJobs,
  getJobById,
  updateJobById,
  deleteJobById,
};
