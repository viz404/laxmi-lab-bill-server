const CounterModel = require("../models/counterModel");

const incrementCount = async (_id) => {
  if (!_id) {
    throw new Error("No id recieved");
  }

  const document = await CounterModel.findById(_id);

  if (document) {
    const updated_document = await CounterModel.findByIdAndUpdate(
      _id,
      { $inc: { count: 1 } },
      { new: true }
    );

    return updated_document.count;
  }

  const new_document = await CounterModel.create({ _id, count: 1 });

  return new_document.count;
};

module.exports = incrementCount;
