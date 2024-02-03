const { DoctorModel } = require("../model");

async function getDoctorDetails(id) {
  try {
    const doctor = await DoctorModel.findOne({ id }, { __v: 0, _id: 0 });
    return { status: true, data: doctor };
  } catch (error) {
    return { status: false, error };
  }
}

module.exports = { getDoctorDetails };
