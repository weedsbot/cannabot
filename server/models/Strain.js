const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  race: { type: String, required: true },
  name: { type: String, required: true },
  flavors: [{ type: String }],
  positive_effects: [{ type: String }],
  negative_effects: [{ type: String }],
  medical_effects: [{ type: String }],
  stock: { type: String },
  description: { type: String },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
