import React from "react";
import "./App.css";

import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import CustomForm from "./components/CustomForm";

const styles = {
  card: {
    minWidth: 275,
    maxWidth: 800
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

function App(props) {
  const { classes } = props;

  return (
    <div className="App">
      <Grid container justify="center">
        <Card className={classes.card}>
          <CardContent>
            <CustomForm />
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
