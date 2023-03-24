const countDocuments = async (model) => {
  return await model.countDocuments();
};

module.exports = countDocuments;
