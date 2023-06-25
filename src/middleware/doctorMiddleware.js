import * as Model from "../model";

function verifyRequestBody(req, res, next) {
  try {
    const { name, works } = req.body;
    let invalidData = false;

    if (!name || typeof name !== "string" || name == "") {
      invalidData = true;
    }

    if (!works || Array.isArray(works) == false || works.length == 0) {
      invalidData = true;
    }

    for (let work of works) {
      if (!work?.title || !work?.price || !work?.price_distribution) {
        invalidData = true;
        break;
      }
    }

    if (invalidData) {
      res.status(400).json({ status: false, error: "invalid data provided" });
      return res;
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, error: "Something went wrong" });
    return res;
  }
}

async function checkDoctorReferences(req, res, next) {
  try {
    const id = req.params.id;

    const jobCheck = await Model.JobModel.findOne({ "doctor.id": id });
    if (jobCheck) {
      res
        .status(400)
        .json({ status: false, error: "jobs are present for this doctor" });
      return res;
    }

    const billCheck = await Model.BillModel.findOne({ "doctor.id": id });
    if (billCheck) {
      res
        .status(400)
        .json({ status: false, error: "bills are present for this doctor" });
      return res;
    }

    const transactionCheck = await Model.TransactionModel.findOne({
      "doctor.id": id,
    });
    if (transactionCheck) {
      res.status(400).json({
        status: false,
        error: "transactions are present for this doctor",
      });
      return res;
    }

    const paymentCheck = await Model.PaymentModel.findOne({
      "doctor.id": id,
    });
    if (paymentCheck) {
      res.status(400).json({
        status: false,
        error: "payments are present for this doctor",
      });
      return res;
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, error: "Something went wrong" });
    return res;
  }
}

export default {
  verifyRequestBody,
  checkDoctorReferences,
};
