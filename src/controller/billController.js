import { accountHelper, nextCount, transactionHelper } from "../helper";
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

    const id = await nextCount("bills");

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
      amount: total_amount,
      type: "Bill",
      doctor_id: doctor.id,
      doctor_name: doctor.name,
    });

    if (transaction.status == false) {
      await BillModel.deleteOne({id});
      throw new Error(transaction.error);
    }

    const balance = await accountHelper.updateBalance({
      amount: total_amount,
      doctor_id: doctor.id,
      previous_bill: {
        id,
        amount: total_amount,
        date: currentDate,
      },
    });

    if (balance.status == false) {
      await BillModel.deleteOne({id});
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

export default {
  addBillManual,
  addBill,
  getBill,
};
