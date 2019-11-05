import React from "react";
import "./App.css";

import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import CustomForm from "./components/CustomForm";

import ReactGA from "react-ga";
// import auth from "./auth.ts"; // Sample authentication provider

const trackingId = "UA-151571265-1"; // Replace with your Google Analytics tracking ID
ReactGA.initialize(trackingId);
ReactGA.pageview(window.location.pathname + window.location.search);
ReactGA.set({
  // userId: auth.currentUserId()
  // any data that is relevant to the user session
  // that you would like to track with google analytics
});

/**
 * Création des Styles cSS pour le component
 */
const styles = {
  card: {
    minWidth: 400,
    maxWidth: 1600,
    overflow: "visible",
    borderRadius: "10px",
    width: "60vw"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
};

/**
 * Déclaration de la fonction (pas de classe pour App.js !)
 */
function App(props) {
  const { classes } = props;

  return (
    <div className="App">
      <Grid container justify="center" style={{ opacity: "0.95" }}>
        <Grid item xs={12}>
          <h1
            className="textTitle"
            style={{ textAlign: "center", marginBottom: "-50px" }}
          >
            PODROZ
          </h1>
        </Grid>
        <Grid item xs={12}>
          <p
            className="textSubTitle, hit-the-floor"
            style={{ textAlign: "center" }}
          >
            VOS VACANCES TAILLÉES SUR MESURE
          </p>
        </Grid>
        <Grid item>
          <Card
            style={{
              textAlign: "center",
              marginTop: "40px",
              marginBottom: "40px"
            }}
            className={classes.card}
          >
            <CardContent style={{ position: "relative" }}>
              <CustomForm />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
