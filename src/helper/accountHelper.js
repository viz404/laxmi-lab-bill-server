import { AccountModel } from "../model";
import nextCount from "./nextCount";

async function createAccount(doctor_name, doctor_id) {
  try {
    if (!doctor_name || !doctor_id) {
      throw new Error("incomplete fields passed while creating account");
    }

    const checkDuplicate = await AccountModel.findOne({
      "doctor.id": doctor_id,
    });

    if (checkDuplicate) {
      throw new Error(`account with doctor id:${doctor_id} already exists`);
    }

    const id = await nextCount("accounts");

    const response = await AccountModel.create({
      id,
      doctor: {
        id: doctor_id,
        name: doctor_name,
      },
    });

    return { status: true, data: response };
  } catch (error) {
    return { status: false, error };
  }
}

async function deleteAccountByDoctorId(id) {
  try {
    await AccountModel.deleteOne({ "doctor.id": id });
    return { status: true };
  } catch (error) {
    return { status: false, error };
  }
}

async function updateBalance({
  amount,
  doctor_id,
  previous_bill,
  previous_payment,
}) {
  try {
    if (!previous_payment && !previous_bill) {
      throw new Error("No payment or bill recieved");
    }

    const response = await AccountModel.findOneAndUpdate(
      { "doctor.id": doctor_id },
      {
        $inc: { balance: amount },
        ...(previous_bill && { previous_bill }),
        ...(previous_payment && { previous_payment }),
      },
      { new: true }
    );
    return { status: true, data: response };
  } catch (error) {
    return { status: false, error };
  }
}

async function getAccount(doctor_id) {
  try {
    const account = await AccountModel.findOne({ "doctor.id": doctor_id });
    return { stauts: true, data: account };
  } catch (error) {
    return { stauts: false, error };
  }
}

export default {
  deleteAccountByDoctorId,
  createAccount,
  updateBalance,
  getAccount,
};
