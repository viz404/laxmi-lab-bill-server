import {
  accountHelper,
  doctorHelper,
  nextCount,
  transactionHelper,
} from "../helper";
import { BillModel, JobModel } from "../model";

async function addBillManual(req, res) {
  try {
    const { particular, date, amount, doctor_id, doctor_name } = req.body;

    if (amount <= 0) {
      throw new Error("invalid amount");
    }

    const transaction = await transactionHelper.createTransaction({
      particular,
      date,
      amount,
      type: "Bill",
      doctor_id,
      doctor_name,
    });

    if (transaction.status == false) {
      throw new Error(transaction.error);
    }

    const balance = await accountHelper.updateBalance({
      amount,
      doctor_id,
      previous_bill: {
        amount,
        date,
      },
    });

    if (balance.status == false) {
      await transactionHelper.deleteTransaction(transaction.data.id);

      throw new Error(balance.error);
    }

    res.json({ status: true, data: balance.data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, error: "Something went wrong" });
  }
}

async function addBill(req, res) {
  try {
    const { amount, previous_balance, total_amount, doctor, jobs } = req.body;

    const id = await nextCount("bills", 101);

    const response = await BillModel.create({
      id,
      amount,
      previous_balance,
      total_amount,
      doctor,
      jobs,
    });

    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString("default", {
      month: "short",
    });

    const transaction = await transactionHelper.createTransaction({
      reference: id,
      particular: `Bill created for ${currentMonth}`,
      date: currentDate,
      amount,
      type: "Bill",
      doctor_id: doctor.id,
      doctor_name: doctor.name,
    });

    if (transaction.status == false) {
      await BillModel.deleteOne({ id });
      throw new Error(transaction.error);
    }

    const balance = await accountHelper.updateBalance({
      amount,
      doctor_id: doctor.id,
      previous_bill: {
        id,
        amount,
        date: currentDate,
      },
    });

    if (balance.status == false) {
      await BillModel.deleteOne({ id });
      await transactionHelper.deleteTransaction(transaction.data.id);
      throw new Error(balance.error);
    }

    res.json({ status: true, data: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, error: "Something went wrong" });
  }
}

async function getBill(req, res) {
  try {
    const bill_id = Number(req.params.bill_id);

    const bill = await BillModel.findOne(
      { id: bill_id },
      { _id: 0, __v: 0, "jobs._id": 0 }
    ).lean();

    let updatedJobs = [];

    for (let job of bill.jobs) {
      let jobDoc = await JobModel.findOne(
        { id: job.id },
        { _id: 0, __v: 0, doctor: 0, "works._id": 0 }
      ).lean();

      let newObj = {
        ...jobDoc,
        amount: job.amount,
      };

      updatedJobs.push(newObj);
    }

    bill.jobs = updatedJobs;

    res.json({ status: true, data: bill });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, error: "Something went wrong" });
  }
}

async function getBills(req, res) {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = page > 0 ? (page - 1) * limit : 0;

    const doctor_name = req.query.doctor_name || "";
    const sort = req.query.sort || "createdAt";
    const filter = {};

    if (doctor_name != "") {
      filter.doctor_name = { $regex: new RegExp(doctor_name, "i") };
    }

    const response = await BillModel.find(filter)
      .sort({ [sort]: -1 })
      .limit(limit)
      .skip(skip);

    const count = await BillModel.countDocuments(filter);

    res.json({
      status: true,
      data: response,
      totalDocuments: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, error: "Something went wrong" });
  }
}

async function deleteBill(req, res) {
  try {
    const id = Number(req.params.id);

    const transactionResponse =
      await transactionHelper.deleteLastTransactionByBillId(id);
    if (transactionResponse.status == false) {
      throw new Error(transactionResponse.error);
    }

    const bill = await BillModel.findOne({ id });

    const accountResponse = await accountHelper.deleteLastBill(bill.doctor.id);
    if (accountResponse.status == false) {
      throw new Error(accountResponse.error);
    }

    const repsonse = await BillModel.deleteOne({ id });

    res.json({ status: true, data: repsonse });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, error: "Something went wrong" });
  }
}

export default {
  addBillManual,
  addBill,
  getBill,
  getBills,
  deleteBill,
};
