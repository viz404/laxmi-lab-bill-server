import { JobModel } from "../model";
import { doctorHelper, nextCount } from "../helper";
import calculationHelper from "../helper/calculationHelper";

async function addJob(req, res) {
  try {
    const {
      date,
      job_number,
      patient_name,
      works,
      shade,
      notes,
      doctor_id,
      doctor_name,
    } = req.body;

    const id = await nextCount("jobs");

    const data = {
      id,
      date,
      job_number,
      patient_name,
      works,
      doctor: {
        id: doctor_id,
        name: doctor_name,
      },
      ...(shade && { shade }),
      ...(notes && { notes }),
    };

    const response = await JobModel.create(data);

    let modified = response.toObject();

    delete modified._id;
    delete modified.__v;

    for (let index in modified.works) {
      delete modified.works[index]._id;
    }

    res.json({ status: true, data: modified });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, error: "Something went wrong" });
  }
}

async function getJobs(req, res) {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const skip = page > 0 ? (page - 1) * limit : 0;

    const doctor_name = req.query.doctor_name || "";
    const sort = req.query.sort || "job_number";
    const filter = {};

    if (doctor_name != "") {
      filter["doctor.name"] = { $regex: new RegExp(doctor_name, "i") };
    }

    const response = await JobModel.find(filter, {
      _id: 0,
      __v: 0,
      "works._id": 0,
    })
      .sort({ [sort]: -1 })
      .skip(skip)
      .limit(limit);

    const count = await JobModel.countDocuments(filter);

    res.json({
      status: true,
      data: response,
      totalDocuments: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, error: "Something went wrong" });
  }
}

async function getJobById(req, res) {
  try {
    const { id } = req.params;

    const response = await JobModel.findOne(
      { id },
      { _id: 0, __v: 0, "works._id": 0 }
    );

    res.json({ status: true, data: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, error: "Something went wrong" });
  }
}

async function getJobByNumber(req, res) {
  try {
    const { job_number } = req.params;

    const response = await JobModel.find(
      { job_number },
      { _id: 0, __v: 0, "works._id": 0 }
    );

    res.json({ status: true, data: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, error: "Something went wrong" });
  }
}

async function updateJob(req, res) {
  try {
    const { id } = req.params;
    const { date, job_number, patient_name, works, shade, notes } = req.body;

    const updateObj = {
      ...(date && { date }),
      ...(job_number && { job_number }),
      ...(patient_name && { patient_name }),
      ...(works && { works }),
      ...(shade && { shade }),
      ...(notes && { notes }),
    };

    const response = await JobModel.findOneAndUpdate({ id }, updateObj, {
      new: true,
    }).select({ _id: 0, __v: 0, "works._id": 0 });

    res.json({ status: true, data: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, error: "Something went wrong" });
  }
}

async function deleteJob(req, res) {
  try {
    const { id } = req.params;

    const response = await JobModel.deleteOne({ id });

    res.json({ status: true, data: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, error: "Something went wrong" });
  }
}

async function getJobsWithPrice(req, res) {
  try {
    const { from_date, to_date } = req.query;
    const { doctor_id } = req.params;

    const doctor = await doctorHelper.getDoctorDetails(doctor_id);

    const jobs = await JobModel.find(
      { "doctor.id": doctor_id },
      { doctor: 0, _id: 0, __v: 0, "works._id": 0 }
    ).lean();

    const amount = calculationHelper.updatejobWithPrice(jobs, doctor.works);

    res.json({
      status: true,
      data: jobs,
      amount,
      doctor: { name: doctor.name, phone: doctor.phone },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, error: "Something went wrong" });
  }
}

export default {
  addJob,
  getJobs,
  getJobById,
  getJobByNumber,
  updateJob,
  deleteJob,
  getJobsWithPrice,
};
