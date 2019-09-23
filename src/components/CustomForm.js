import React, { Component } from "react";

import FormDestination from "./FormDestination";
import FormTravelPref from "./FormTravelPref";
import Confirm from "./Confirm";
import Success from "./Success";

class CustomForm extends Component {
  state = {
    step: 1,
    firstName: "",
    lastName: "",
    age: "",
    sex: "",
    selectedOption: null,
    selectedOption2: null
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
    this.setState({
      [input]: e.target.value
    });
  };

  handleCountryChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };

  handleThemeChange = selectedOption2 => {
    this.setState({ selectedOption2 });
    console.log(`Option selected:`, selectedOption2);
  };

  render() {
    const { step } = this.state;
    const {
      firstName,
      lastName,
      age,
      sex,
      selectedOption,
      selectedOption2
    } = this.state;
    const values = {
      firstName,
      lastName,
      age,
      sex,
      selectedOption,
      selectedOption2
    };

    switch (step) {
      case 1:
        return (
          <FormDestination
            nextStep={this.nextStep}
            handleCountryChange={this.handleCountryChange}
            handleThemeChange={this.handleThemeChange}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 2:
        return (
          <FormTravelPref
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
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
