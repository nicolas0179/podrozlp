import React, { Component } from "react";

import FormDestination from "./FormDestination";
import FormTravelPref from "./FormTravelPref";
import Confirm from "./Confirm";
import Success from "./Success";
import AccrocheText from "./AccrocheText";

class CustomForm extends Component {
  state = {
    step: 0,
    firstName: "",
    lastName: "",
    age: "",
    sex: "",
    selectedOption: null,
    selectedOption2: null,
    avion: false,
    train: false,
    voiture: false,
    velo: false
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

  handleCheck = name => event => {
    this.setState({ ...this.state, [name]: event.target.checked });
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
      email,
      firstName,
      lastName,
      age,
      sex,
      selectedOption,
      selectedOption2,
      avion,
      train,
      voiture,
      velo
    } = this.state;
    const values = {
      email,
      firstName,
      lastName,
      age,
      sex,
      selectedOption,
      selectedOption2,
      avion,
      train,
      voiture,
      velo
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
