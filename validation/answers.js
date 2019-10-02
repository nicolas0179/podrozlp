const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateAnswer(data) {
  let errors = {};
  console.log("data : ", data);
  // Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.sex = !isEmpty(data.sex) ? data.sex : "";
  // data.age = !isEmpty(data.age) ? data.age : "";
  // data.trips = !isEmpty(data.trips) ? data.trips : "";

  // Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Nom invalide";
  }

  //   Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  // Sexe checks
  if (Validator.isEmpty(data.sex)) {
    errors.sex = "Sexe invalide";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
