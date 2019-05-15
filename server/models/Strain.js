const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const strainSchema = new Schema({
  race: { type: String, required: true },
  name: { type: String, required: true },
  flavors: [{ type: String }],
  positive_effects: [{ type: String }],
  negative_effects: [{ type: String }],
  medical_effects: [{ type: String }],
  stock: { type: String },
  description: { type: String },
  image_url:{ type: String}
});

const Strain = mongoose.model("Strain", strainSchema);
module.exports = Strain;
