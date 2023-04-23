const { Schema, model } = require("mongoose");

const accountSchema = new Schema({
  _id: { type: Number, required: true },
  doctor: { type: Number, ref: "Doctor", required: true },
  doctorName: { type: String, required: true },
  balance: { type: Number, required: true },
});

const AccountModel = model("Account", accountSchema);

module.exports = AccountModel;
