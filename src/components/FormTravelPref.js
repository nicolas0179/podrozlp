import React, { Component } from "react";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import AppBar from "@material-ui/core/AppBar";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Toolbar } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import { useTheme, withStyles } from "@material-ui/core/styles";

export class FormTravelPref extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values, handleChange } = this.props;

    return (
      <MuiThemeProvider>
        <React.Fragment>
          <AppBar position="static">
            <Toolbar>
              {/* <IconButton edge="start" color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton> */}
              <Typography variant="h6">Enter User Destination</Typography>
            </Toolbar>
          </AppBar>
          <form>
            <TextField
              id="age"
              label="Age"
              onChange={handleChange("age")}
              defaultValue={values.age}
            />
            <br />
            <TextField
              id="sex"
              label="Sexe"
              onChange={handleChange("sex")}
              defaultValue={values.sex}
            />
            <br />
            <Button
              variant="contained"
              //color="primary"
              style={styles.button}
              onClick={this.back}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={styles.button}
              onClick={this.continue}
            >
              Continue
            </Button>
          </form>
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

const styles = {
  button: {
    margin: 15
  }
};

export default FormTravelPref;
