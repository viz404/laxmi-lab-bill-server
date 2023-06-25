import { AccountModel } from "../model";

async function updateAccount(req, res) {
  try {
    const { previous_bill, previous_payment } = req.body;
    const id = req.params.id;

    const updateObj = {
      ...(previous_bill && { previous_bill }),
      ...(previous_payment && { previous_payment }),
    };

    const response = await AccountModel.updateOne({ id }, updateObj);

    return { status: true, data: response };
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, error: "Something went wrong" });
  }
}
