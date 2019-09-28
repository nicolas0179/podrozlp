const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const answerSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, trim: true },
    age: { type: Number, required: true },
    sex: { type: String, required: true },
    trips: [
      {
        country: { type: String },
        activities: [
          {
            activity: { type: String }
          }
        ]
      }
    ]
  },
  {
    timestamps: true
  }
);

const Answers = mongoose.model("Answers", answerSchema);

module.exports = Answers;
