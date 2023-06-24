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

export default {
  verifyRequestBody,
};
