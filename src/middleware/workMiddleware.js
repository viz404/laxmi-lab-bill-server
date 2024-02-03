function verifyRequestBody(req, res, next) {
  try {
    const { title } = req.body;

    if (!title || typeof title !== "string" || title == "") {
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
};
