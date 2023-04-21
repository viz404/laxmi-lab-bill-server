const JobModel = require("../models/jobModel");
const BillModel = require("../models/billModel");
const DoctorModel = require("../models/doctorModel");

const countDocuments = require("../helper/countDocuments");
const incrementCount = require("../helper/incrementCount");

const addJob = async (req, res) => {
  try {
    const job = req.body;

    const _id = await incrementCount("job_id");

    const response = await JobModel.create({ _id, ...job });

    await DoctorModel.findByIdAndUpdate(response.doctor, {
      $inc: { workCount: 1 },
    });

    return res.json({ response, status: true });
  } catch (error) {
    console.log(error);
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
      filters.doctor = doctor_id;
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

    if (no_limit == "true" && filters?.date) {
      response = await JobModel.find({ filters })
        .sort({ jobNumber: -1 })
        .populate("doctor");
    } else {
      response = await JobModel.find(filters)
        .sort({ jobNumber: -1 })
        .skip(skip)
        .limit(_limit)
        .populate("doctor");

      const count = await countDocuments(JobModel);

      res.set("X-Total-Count", count);
    }

    return res.json({ response, status: true });
  } catch (error) {
    console.log(error);
    res.status(500);
    return res.json({ error: error.message, status: false });
  }
};

const getJobById = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await JobModel.findById(id).populate("doctor");

    return res.json({ response, status: true });
  } catch (error) {
    console.log(error);
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
    console.log(error);
    res.status(500);
    return res.json({ error: error.message, status: false });
  }
};

const deleteJobById = async (req, res) => {
  try {
    const { id } = req.params;

    const bills = await BillModel.find({ jobs: { $in: [id] } });

    if (bills.length > 0) {
      throw new Error("Can't delete, this job is used in a bill");
    }

    const response = await JobModel.findByIdAndDelete(id);

    await DoctorModel.findByIdAndUpdate(response.doctor, {
      $inc: { workCount: -1 },
    });

    return res.json({ response, status: true });
  } catch (error) {
    console.log(error);
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
