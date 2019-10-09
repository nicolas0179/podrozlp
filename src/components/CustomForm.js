import React, { Component } from "react";
import FormDestination from "./FormDestination";
import FormTravelPref from "./FormTravelPref";
import Success from "./Success";
import AccrocheText from "./AccrocheText";
import axios from "axios";
import ReactGA from "react-ga";

// const keys = require("../keys");

// axios.defaults.baseURL = keys.baseUrl;

axios.defaults.baseURL = "http://api.podroz.fr";

class CustomForm extends Component {
  /**
   * Déclaration des states
   */
  state = {
    step: 0,
    name: "",
    age: "",
    sex: "",
    email: "",
    entourage: null,
    trip1: { country: null, stayLength: "", activities: null },
    trip2: { country: null, stayLength: "", activities: null },
    trip3: { country: null, stayLength: "", activities: null },
    errors: {},
    errorText: "",
    selectedDate: new Date("2014-05-13T21:11:54")
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
    //VALIDATION DU FIELD Age
    if (input === "age") {
      if (!isNaN(e.target.value)) {
        this.setState({ [input]: e.target.value, errorText: "" });
        return;
      } else {
        e.target.value = "";
        this.setState({
          errorText: "Un âge c'est des chiffres :)"
        });
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

  /**
   * Récupération des données des destinations dans trip
   * Par un système de copie !
   * exemple :
   * a=(0,0)
   * b=a
   * b(1) = 1
   * a=b
   * a=(1,0)
   */
  handleCountryChange = trip => e => {
    let tripCopy = JSON.parse(JSON.stringify(this.state[trip]));
    tripCopy.country = e.value;

    this.setState({
      [trip]: tripCopy
    });
  };

  /**
   * Récupération des données des destinations dans trip
   * Par un système de copie !
   * exemple :
   * a=(0,0)
   * b=a
   * b(1) = 1
   * a=b
   * a=(1,0)
   */
  handleStayLengthChange = trip => e => {
    let tripCopy = JSON.parse(JSON.stringify(this.state[trip]));

    tripCopy.stayLength = e.target.value;

    this.setState({
      [trip]: tripCopy
    });
  };
  /**
   * Récupération des données des destinations dans trip
   * Par un système de copie !
   * exemple :
   * a=(0,0)
   * b=a
   * b(1) = 1
   * a=b
   * a=(1,0)
   */
  handleTripChange = trip => e => {
    let tripCopy = JSON.parse(JSON.stringify(this.state[trip]));
    tripCopy.activities = [];

    if (!(e == null)) {
      for (var i = 0; i < e.length; i++) {
        tripCopy.activities.push({
          activity: e[i].value
        });
      }
    }
    this.setState({
      [trip]: tripCopy
    });
  };

  /**
   * Récupération des données des entourages
   */
  handleEntourageChange = e => {
    var entourageCopy = [];

    if (!(e == null)) {
      for (var i = 0; i < e.length; i++) {
        entourageCopy.push({ entourageCategory: e[i].value });
      }
    }
    this.setState({
      entourage: entourageCopy
    });
  };

  /**
   * Fonction de gestion d'envoi des données
   */
  handleSubmit = e => {
    e.preventDefault();
    ReactGA.event({
      category: "Sign Up",
      action: "Bouton Envoyer cliqué"
    });
    const answer = {
      name: this.state.name,
      age: Number(this.state.age),
      sex: this.state.sex,
      email: this.state.email,
      entourage: this.state.entourage,
      trips: [this.state.trip1, this.state.trip2, this.state.trip3]
    };
    console.log("Yo");
    axios
      .post("/answers/add", answer)
      .then(res => {
        console.log(res.data);
        this.nextStep();
      })
      .catch(function(error) {
        alert("Certains champs ne sont pas valides");
      });
  };

  render() {
    /**
     * Déclartion des states
     */
    const { step, errors } = this.state;
    const {
      email,
      name,
      age,
      sex,
      trip1,
      trip2,
      trip3,
      entourage,
      errorText,
      selectedDate
    } = this.state;
    /*
     * On stock les states dans values pour ensuite passer values dans les autres components
     */
    const values = {
      step,
      email,
      name,
      age,
      sex,
      trip1,
      trip2,
      trip3,
      entourage,
      errorText,
      selectedDate
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
            handleChange={this.handleChange}
            handleCheck={this.handleCheck}
            handleTripChange={this.handleTripChange}
            handleStayLengthChange={this.handleStayLengthChange}
            handleEntourageChange={this.handleEntourageChange}
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
        return <Success />;
      default:
        return <h1>Default</h1>;
    }
  }
}

export default CustomForm;
