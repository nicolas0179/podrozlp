const router = require("express").Router();
let Answers = require("../models/Answers.model");

// Validation
const validateAnswer = require("../../validation/answers");

router.route("/").get((req, res) => {
  Answers.find() // method to get a list for all the users from the db
    .then(answers => res.json(answers)) // return on json format
    .catch(err => res.status(400).json("Error on GET all answers: " + err));
});

///////////////////////
// Add endpoint //
///////////////////////
// @route POST answers/add
// @desc Add answer
// @access Public
router.post("/add", (req, res) => {
  // Form validation
  // console.log("req : ", req);
  const { errors, isValid } = validateAnswer(req.body);
  console.log("req body : ", req.body);
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
    trips: req.body.trips
  });
  console.log("New entry in the Answer DB : ", newAnswer);
  newAnswer
    .save()
    .then(() => res.json("Answer added!"))
    .catch(err => res.status(400).json("Error for adding answer: " + err));
});

// router.route("/:id").get((req, res) => {
//   Country.findById(req.params.id)
//     .then(country => res.json(country))
//     .catch(err => res.status(400).json("Error: " + err));
// });

// router.route("/update/:id").post((req, res) => {
//   Country.findById(req.params.id)
//     .then(country => {
//       country.countryName = req.body.countryName;
//       country.capital = req.body.capital;
//       country.countryCode = req.body.countryCode;

//       country
//         .save()
//         .then(() => res.json("Country updated!"))
//         .catch(err => res.status(400).json("Error: " + err));
//     })
//     .catch(err => res.status(400).json("Error: " + err));
// });

module.exports = router;
