const router = require("express").Router();
let Country = require("../models/Country.model");

router.route("/").get((req, res) => {
  Country.find() // method to get a list for all the users from the db
    .then(countries => res.json(countries)) // return on json format
    .catch(err => res.status(400).json("Error: " + err));
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
