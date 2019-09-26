import React, { Component } from "react";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import AppBar from "@material-ui/core/AppBar";
import { Toolbar } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

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
    return (
      <MuiThemeProvider>
        <React.Fragment>
          {/* <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6">Confirm User Data</Typography>
            </Toolbar>
          </AppBar> */}
          <h1>Suite</h1>
          <p>
            Vous allez recevoir prochainement un email pour obtenir des
            recommandations personnalisées de lieux à découvrir
          </p>
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

export default FormTravelPref;
