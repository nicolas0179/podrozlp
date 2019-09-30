const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const activitySchema = new Schema({
  value: { type: String, required: true }
});

const Activity = mongoose.model("Activity", activitySchema);

module.exports = Activity;
