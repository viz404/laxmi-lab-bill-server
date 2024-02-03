async function verifyRequestBody(req, res, next) {
  try {
    const { date, job_number, works, doctor_id, doctor_name } = req.body;
    let invalidData = false;

    if (!date || !job_number || !doctor_id || !doctor_name) {
      invalidData = true;
    }

    for (let work of works) {
      if (!work.title) {
        invalidData = true;
        break;
      }

      if (
        !work.upper_left &&
        !work.upper_right &&
        !work.lower_left &&
        !work.lower_right
      ) {
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

async function verifyPriceRequest(req, res, next) {
  try {
    const { from_date, to_date } = req.query;
    const { doctor_id } = req.params;

    if (!doctor_id || !from_date || !to_date) {
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

module.exports = {
  verifyRequestBody,
  verifyPriceRequest,
};
