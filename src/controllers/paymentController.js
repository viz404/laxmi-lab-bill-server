import PaymentModel from "../models/paymentModel";

import incrementCount from "../helper/incrementCount";
import updateDoctorBalance from "../helper/updateDoctorBalance";
import createTransaction from "../helper/createTransaction";

const addPayment = async (req, res) => {
  try {
    const payment = req.body;

    const _id = incrementCount("payment_id");

    const response = await PaymentModel.create({ _id, ...payment });

    const updatedBalance = await updateDoctorBalance(
      response.doctor,
      -response.amount
    );

    const transactionParticular = `Payment ${response.mode}, ID: ${_id}`;

    await createTransaction({
      doctorId: response.doctor,
      balance: updatedBalance,
      particular: transactionParticular,
      paymentId: _id,
    });

    return res.json({ response, status: true });
  } catch (error) {
    console.log(error);
    res.status(500);
    return res.json({ error: error.message, status: false });
  }
};
