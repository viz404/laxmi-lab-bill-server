import { accountHelper, transactionHelper } from "../helper";

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

export default {
  addBillManual,
};
