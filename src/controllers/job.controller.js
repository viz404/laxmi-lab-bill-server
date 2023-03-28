const JobModel = require("../models/job.model");

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

module.exports = { addJob };
