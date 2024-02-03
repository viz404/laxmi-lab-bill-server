const { CounterModel } = require("../model");

async function nextCount(model, initialCount = 1) {
  try {
    if (!model || typeof model !== "string") {
      throw new Error("no model name provided");
    }

    const prev = await CounterModel.findOne({ model });

    const filter = { model };
    const update = {
      $inc: { count: prev?.count ? 1 : initialCount },
    };
    const options = { upsert: true, new: true };

    const counter = await CounterModel.findOneAndUpdate(
      filter,
      update,
      options
    );

    return counter.count;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = nextCount;
