import { DoctorModel } from "../model";
import { nextCount, createAccount, deleteAccountByDoctorId } from "../helper";

async function addDoctor(req, res) {
  try {
    const { name, phone, area, address, works } = req.body;

    const id = await nextCount("doctors");

    const response = await DoctorModel.create({
      id,
      name,
      phone,
      area,
      address,
      works,
    });

    const accountCreation = await createAccount(name, id);

    if (accountCreation.status == false) {
      DoctorModel.deleteOne({ id });
      throw new Error(accountCreation.error);
    }

    let modified = response.toObject();

    delete modified._id;
    delete modified.__v;

    for (let index in modified.works) {
      delete modified.works[index]._id;
    }

    res.json({ status: true, data: modified });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, error: "Something went wrong" });
  }
}

async function getDoctors(req, res) {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = page > 0 ? (page - 1) * limit : 0;

    const name = req.query.name || "";
    const sort = req.query.sort || "name";
    const filter = {};

    if (name != "") {
      filter.name = { $regex: new RegExp(name, "i") };
    }

    const response = await DoctorModel.aggregate([
      {
        $match: filter,
      },
      {
        $lookup: {
          from: "accounts",
          localField: "id",
          foreignField: "doctor.id",
          as: "accountDetails",
        },
      },
      {
        $project: {
          _id: 0,
          __v: 0,
          works: 0,
          "accountDetails._id": 0,
          "accountDetails.__v": 0,
          "accountDetails.doctor": 0,
        },
      },
      {
        $unwind: "$accountDetails",
      },
      {
        $sort: { [sort]: 1 },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
    ]);

    const count = await DoctorModel.countDocuments(filter);

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

async function getDoctorById(req, res) {
  try {
    const { id } = req.params;

    const response = await DoctorModel.findOne(
      { id },
      { _id: 0, __v: 0, "works._id": 0 }
    );

    res.json({ status: true, data: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, error: "Something went wrong" });
  }
}

async function updateDoctor(req, res) {
  try {
    const { id } = req.params;
    const { name, phone, area, address, works } = req.body;

    const updateObj = {
      ...(name && { name }),
      ...(phone && { phone }),
      ...(area && { area }),
      ...(address && { address }),
      ...(works && { works }),
    };

    const response = await DoctorModel.findOneAndUpdate({ id }, updateObj, {
      new: true,
    }).select({ _id: 0, __v: 0, "works._id": 0 });

    res.json({ status: true, data: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, error: "Something went wrong" });
  }
}

async function deleteDoctor(req, res) {
  try {
    const { id } = req.params;

    const response = await DoctorModel.deleteOne({ id });

    const deleteAccount = await deleteAccountByDoctorId(id);
    if (deleteAccount.status == false) {
      throw new Error(deleteAccount.error);
    }

    res.json({ status: true, data: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, error: "Something went wrong" });
  }
}

export default {
  addDoctor,
  getDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
};
