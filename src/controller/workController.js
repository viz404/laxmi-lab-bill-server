const { nextCount } = require("../helper");
const { WorkModel } = require("../model");

async function addWork(req, res) {
  try {
    const { title } = req.body;

    const id = await nextCount("works");

    const response = await WorkModel.create({ id, title });

    let modified = response.toObject();

    delete modified._id;
    delete modified.__v;

    res.json({ status: true, data: modified });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, error: "Something went wrong" });
  }
}

async function getWorks(req, res) {
  try {
    const response = await WorkModel.find({}, { _id: 0, __v: 0 });

    res.json({ status: true, data: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, error: "Something went wrong" });
  }
}

async function deleteWork(req, res) {
  try {
    const { id } = req.params;

    const response = await WorkModel.deleteOne({ id });

    res.json({ status: true, data: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, error: "Something went wrong" });
  }
}

async function updateWork(req, res) {
  try {
    const { id } = req.params;
    const { title } = req.body;

    const response = await WorkModel.findOneAndUpdate(
      { id },
      { title },
      { new: true }
    );

    const modified = response.toObject();

    delete modified._id;
    delete modified.__v;

    res.json({ status: true, data: modified });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, error: "Something went wrong" });
  }
}

module.exports = {
  addWork,
  getWorks,
  deleteWork,
  updateWork,
};
