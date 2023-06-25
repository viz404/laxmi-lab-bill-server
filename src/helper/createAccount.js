import { AccountModel } from "../model";
import nextCount from "./nextCount";

async function createAccount(doctor_name, doctor_id) {
  try {
    if (!doctor_name || !doctor_id) {
      return {
        status: false,
        error: "incomplete fields passed while creating account",
      };
    }

    const checkDuplicate = await AccountModel.findOne({
      "doctor.id": doctor_id,
    });

    if (checkDuplicate) {
      return {
        status: false,
        error: `account with doctor id:${doctor_id} already exists`,
      };
    }

    const id = await nextCount("accounts");

    await AccountModel.create({
      id,
      doctor: {
        id: doctor_id,
        name: doctor_name,
      },
    });

    return { status: true };
  } catch (error) {
    console.log(error);
    return { status: false, error: "couldn't create account" };
  }
}

export default createAccount;
