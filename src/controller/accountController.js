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

async function getAccount(req, res) {
  try {
    const doctorId = req.params.doctorId;

    const response = await AccountModel.aggregate([
      {
        $match: {"doctor.id": doctorId}
      },
      {
        $lookup: {
          from: "doctors",
          localField: "doctor.id",
          foreignField: "id",
          as: "doctor_details",
        }
      },
      {
        $project: {
          _id: 0,
          __v: 0,
          "doctor_details._id": 0,
          "doctor_details.__v": 0,
          "doctor_details.works": 0,
        }
      },
      {
        $unwind: "$doctor_details",
      }
    ]);
    // add lookup for bill and payment
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, error: "Something went wrong" });
  }
}