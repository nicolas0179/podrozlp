import React, { Component } from "react";

import FormDestination from "./FormDestination";
import FormTravelPref from "./FormTravelPref";

class CustomForm extends Component {
  state = {
    step: 1,
    firstName: "",
    lastName: "",
    age: "",
    sex: ""
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

  render() {
    const { step } = this.state;
    const { firstName, lastName, age, sex } = this.state;
    const values = { firstName, lastName, age, sex };

    switch (step) {
      case 1:
        return (
          <FormDestination
            nextStep={this.nextStep}
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
        return <h1>FormPersonal</h1>;
      case 4:
        return <h1>Success</h1>;
      default:
        return <h1>Default</h1>;
    }
  }
}

export default CustomForm;
