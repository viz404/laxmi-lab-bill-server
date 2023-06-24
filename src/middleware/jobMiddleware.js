async function verifyRequestBody(req, res, next) {
  try {
    const { date, job_number, patient_name, works, doctor_id, doctor_name } =
      req.body;
    let invalidData = false;

    if (!date || !job_number || !patient_name || !doctor_id || !doctor_name) {
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

export default {
  verifyRequestBody,
};
