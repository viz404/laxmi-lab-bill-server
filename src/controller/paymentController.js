const { accountHelper, nextCount, transactionHelper } = require("../helper");
const { PaymentModel } = require("../model");

async function addPayment(req, res) {
  try {
    const {
      amount,
      date,
      mode,
      mobile,
      cheque,
      notes,
      doctor_id,
      doctor_name,
    } = req.body;

    const id = await nextCount("payments");

    const response = await PaymentModel.create({
      id,
      amount,
      date,
      mode,
      doctor: {
        id: doctor_id,
        name: doctor_name,
      },
      ...(mobile && { mobile }),
      ...(cheque && { cheque }),
      ...(notes && { notes }),
    });

    const transaction = await transactionHelper.createTransaction({
      reference: id,
      amount,
      date,
      doctor_id,
      doctor_name,
      particular: notes ?? `Payment added for Dr. ${doctor_name}`,
      type: "Payment",
    });

    if (transaction.status == false) {
      throw new Error(transaction.error);
    }

    const balance = await accountHelper.updateBalance({
      amount: Number(amount) * -1,
      doctor_id: doctor_id,
      previous_payment: {
        id,
        amount,
        date,
      },
    });

    if (balance.status == false) {
      await PaymentModel.deleteOne({ id });
      await transactionHelper.deleteTransaction(transaction.data.id);
      throw new Error(balance.error);
    }

    res.json({ status: true, data: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, error: "Something went wrong" });
  }
}

module.exports = {
  addPayment,
};
