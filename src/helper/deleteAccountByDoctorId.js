import { AccountModel } from "../model";

async function deleteAccountByDoctorId(id) {
  try {
    await AccountModel.deleteOne({ "doctor.id": id });
    return { status: true };
  } catch (error) {
    console.log(error);
    return { status: false, error: "couldn't delete account" };
  }
}

export default deleteAccountByDoctorId;
