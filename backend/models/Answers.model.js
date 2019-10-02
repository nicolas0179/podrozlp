const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/**
 * Schéma de réponse du formulaire
 */
const answerSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, trim: true },
    age: { type: Number, required: true },
    sex: { type: String, required: true },
    entourage: [
      {
        entourageCategory: { type: String }
      }
    ],
    trips: [
      {
        country: { type: String },
        stayLength: { type: String },
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
