const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  image_url: { type: String },
  username: { type: String, required: true },
  password: {type: String, required: true},
  strains: [{ type: Schema.Types.ObjectId, ref: "Strain"}],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
