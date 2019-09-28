import React, { Component } from "react";

import FormDestination from "./FormDestination";
import FormTravelPref from "./FormTravelPref";
import Confirm from "./Confirm";
import Success from "./Success";
import AccrocheText from "./AccrocheText";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";

class CustomForm extends Component {
  state = {
    step: 0,
    firstName: "",
    lastName: "",
    age: "",
    sex: "",
    email: "",
    trip1: { country: null, activities: null },
    trip2: { country: null, activities: null },
    trip3: { country: null, activities: null },
    errors: {},
    errorText: ""
  };

  // Proceed to the next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  // Go back to previous step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  // Handle fields change
  handleChange = input => e => {
    if (input === "age") {
      if (!isNaN(e.target.value)) {
        this.setState({ [input]: e.target.value, errorText: "" });
        console.log("ok it's number");
        return;
      } else {
        e.target.value = "";
        this.setState({
          errorText: "Un âge c'est des chiffres :)"
        });
        console.log("notnumber");
        return;
      }
    }
    this.setState({
      [input]: e.target.value
    });
  };

  handleCheck = name => event => {
    this.setState({ ...this.state, [name]: event.target.checked });
  };

  handleCountryChange = trip => e => {
    let tripCopy = JSON.parse(JSON.stringify(this.state[trip]));
    console.log(tripCopy);
    console.log(`Event: `, e);
    tripCopy.country = e.value;

    this.setState({
      [trip]: tripCopy
    });
    console.log("State : ", this.state);
  };

  handleTripChange = trip => e => {
    let tripCopy = JSON.parse(JSON.stringify(this.state[trip]));
    console.log(tripCopy);
    console.log(`Event: `, e);
    tripCopy.activities = [];

    if (!(e == null)) {
      for (var i = 0; i < e.length; i++) {
        tripCopy.activities.push({
          // activity: { value: e[i].value, label: e[i].label }
          activity: e[i].value
        });
      }

      // tripCopy.activities = e.map(x => x.value);
    }
    this.setState({
      [trip]: tripCopy
    });
    // this.setState({ [trip]: e.target.value });
    // console.log(`Trip:`, this.state.trip1);
  };

  handleThemeChange = selectedOption2 => {
    this.setState({ selectedOption2 });
    console.log(`Option selected:`, selectedOption2);
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    const answer = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      age: Number(this.state.age),
      sex: this.state.sex,
      email: this.state.email,
      trips: [this.state.trip1, this.state.trip2, this.state.trip3]
      // trip1: this.state.trip1,
      // trip2: this.state.trip2,
      // trip3: this.state.trip3
    };

    console.log("answer : ", answer);
    axios
      .post("/answers/add", answer)
      .then(res => console.log(res.data))
      .catch(function(error) {
        console.log(error);
      });

    // window.location = "/";
  };

  render() {
    const { step, errors } = this.state;
    const {
      email,
      firstName,
      lastName,
      age,
      sex,
      trip1,
      trip2,
      trip3,
      errorText
    } = this.state;

    const values = {
      email,
      firstName,
      lastName,
      age,
      sex,
      trip1,
      trip2,
      trip3,
      errorText
    };

    switch (step) {
      case 0:
        return <AccrocheText nextStep={this.nextStep} />;
      case 1:
        return (
          <FormDestination
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleCountryChange={this.handleCountryChange}
            handleThemeChange={this.handleThemeChange}
            handleChange={this.handleChange}
            handleCheck={this.handleCheck}
            handleTripChange={this.handleTripChange}
            handleSubmit={this.handleSubmit}
            values={values}
            errors={errors}
          />
        );
      case 2:
        return (
          <FormTravelPref
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            values={values}
            errors={errors}
          />
        );
      case 3:
        return (
          <Confirm
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={values}
          />
        );
      case 4:
        return <Success />;
      default:
        return <h1>Default</h1>;
    }
  }
}

export default CustomForm;
