import React, { Component } from "react";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import AppBar from "@material-ui/core/AppBar";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Toolbar } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import PropTypes from "prop-types";

import { useTheme, withStyles } from "@material-ui/core/styles";

const styles = {
  formControl: {
    margin: 24
  }
};

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
    const { classes } = this.props;

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
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender1"
                value={values.sex}
                onChange={handleChange("sex")}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
            <br />
            <TextField
              id="email"
              label="Email"
              onChange={handleChange("email")}
              defaultValue={values.email}
              type="email"
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

FormTravelPref.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FormTravelPref);

//export default FormTravelPref;
