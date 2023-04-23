const DoctorModel = require("../models/doctorModel");

const updateDoctorWorkCount = async (doctorId, count) => {
  if (!doctorId) {
    throw new Error("No id recieved");
  }

  if (!count) {
    throw new Error("No count recieved");
  }

  await DoctorModel.findByIdAndUpdate(doctorId, {
    $inc: { workCount: count },
  });
};

module.exports = updateDoctorWorkCount;
