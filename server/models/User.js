const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  facebookId: { type: String, required: true },
  username: { type: String, required: true },
  strains: [{ type: Schema.Types.ObjectId, ref: "Strain" }],
  rol: {enum : ['admin','partner'], default: 'partner'}
});

const User = mongoose.model("User", userSchema);
module.exports = User;
