const router = require("express").Router();
let Answers = require("../models/Answers.model");

// Validation
const validateAnswer = require("../../validation/answers");

/**
 * Retrieve all the form answers
 */
router.route("/").get((req, res) => {
  Answers.find() // method to get a list for all the users from the db
    .then(answers => res.json(answers)) // return on json format
    .catch(err => res.status(400).json("Error on GET all answers: " + err));
});

///////////////////
// Add endpoint //
//////////////////
// @route POST answers/add
// @desc Add answer
// @access Public
router.post("/add", (req, res) => {
  // Form validation

  const { errors, isValid } = validateAnswer(req.body);
  // Check validation
  if (!isValid) {
    console.log("Non valide !");
    return res.status(400).json(errors);
  }
  const newAnswer = new Answers({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    age: req.body.age,
    sex: req.body.sex,
    entourage: req.body.entourage,
    trips: req.body.trips
  });
  newAnswer
    .save()
    .then(() => res.json("Answer added!"))
    .catch(err => res.status(400).json("Error for adding answer: " + err));
});

module.exports = router;
