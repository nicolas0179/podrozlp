const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const countrySchema = new Schema({
  Pays: { type: String, required: true },
  Capital: { type: String, required: true }
});

const Country = mongoose.model("Pays", countrySchema);

module.exports = Country;
