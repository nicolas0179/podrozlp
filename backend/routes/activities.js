const router = require("express").Router();
let Activity = require("../models/Activity.model");

router.route("/").get((req, res) => {
  Activity.find() // method to get a list for all the users from the db
    .then(activities => res.json(activities)) // return on json format
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
