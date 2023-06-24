import { DoctorModel } from "../model";

async function getDoctorDetails(id) {
  try {
    return await DoctorModel.findOne({ id }, { __v: 0, _id: 0 });
  } catch (error) {
    throw new Error(error);
  }
}

export default { getDoctorDetails };
