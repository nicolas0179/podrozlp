import React, { Component } from "react";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { red } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#556cd6"
    },
    secondary: {
      main: "#19857b"
    },
    error: {
      main: red.A400
    },
    background: {
      default: "#fff"
    }
  }
});

export class FormTravelPref extends Component {
  /**
   * NextPage
   */
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  /**
   * PrevPage
   */
  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <React.Fragment>
          <h1 className="textTitleCard"> Podroz vous remercie !</h1>
          <p style={{ fontSize: "16px" }}>
            Toutes ces informations nous permettent de faire évoluer Podroz.
            Chacun de vos voyages à une réelle importance pour nous !
            <br /> Vous trouverez davantages d'informations sur notre projet ici
            : WWW.YOUTEUBETUB.FR, et si vous souhaitez nous contacter ce sera
            ici : contact@waterbot.fr <br />
            N'hésitez pas à nous partager à tous vos amis amateurs de voyages
          </p>
          <h1 className="textTitleCard" style={{ fontSize: "30px" }}>
            {" "}
            Encore merci & à bientôt :){" "}
          </h1>
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

export default FormTravelPref;
