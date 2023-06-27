import { AccountModel } from "../model";

async function getAccount(req, res) {
  try {
    const doctor_id = Number(req.params.doctor_id);

    const response = await AccountModel.findOne(
      { "doctor.id": doctor_id },
      { _id: 0, __v: 0 }
    );

    res.json({ status: true, data: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, error: "Something went wrong" });
  }
}

export default {
  getAccount,
};
