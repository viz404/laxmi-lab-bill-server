import { TransactionModel } from "../model";
import nextCount from "./nextCount";

async function createTransaction({
  particular,
  date,
  amount,
  reference,
  type,
  doctor_id,
  doctor_name,
}) {
  try {
    let required = [];

    if (!date) {
      required.push("date");
    }

    if (!amount) {
      required.push("amount");
    }

    if (!particular) {
      required.push("particular");
    }

    if (!doctor_id) {
      required.push("doctor_id");
    }

    if (!doctor_name) {
      required.push("doctor_name");
    }

    if (!type) {
      required.push("type");
    }

    if (required.length > 0) {
      throw new Error(`Incomplete fields: ${required.join(", ")}`);
    }

    const id = await nextCount("transactions");

    const response = await TransactionModel.create({
      id,
      date,
      amount,
      particular,
      type,
      doctor: {
        id: doctor_id,
        name: doctor_name,
      },
      ...(reference && { reference }),
    });

    return { status: true, data: response };
  } catch (error) {
    return { status: false, error };
  }
}

async function deleteTransaction(id) {
  try {
    if (!id) {
      throw new Error("no id recieved");
    }

    const response = await TransactionModel.deleteOne({ id });

    return { status: true, data: response };
  } catch (error) {
    return { status: false, error };
  }
}

async function deleteLastTransactionByBillId(id) {
  try {
    if (!id) {
      throw new Error("no id recieved");
    }

    const response = await TransactionModel.deleteOne({
      reference: id,
      type: "Bill",
    });

    return { status: true, data: response };
  } catch (error) {
    return { status: false, error };
  }
}

export default {
  createTransaction,
  deleteTransaction,
  deleteLastTransactionByBillId,
};
