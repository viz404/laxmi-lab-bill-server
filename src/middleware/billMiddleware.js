async function verifyRequestBody(req, res, next) {
  try {
    const { amount, previous_balance, total_amount, doctor, jobs } = req.body;

    let invalidData = false;

    if (!amount || typeof(previous_balance) != "number" || !total_amount || !doctor || !jobs) {
      invalidData = true;
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
