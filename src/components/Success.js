import React, { Component } from "react";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { red } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";
import Obfuscate from "react-obfuscate";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
//CustomButton
const BackButton = withStyles(theme => ({
  root: {
    fontWeight: 800,
    minWidth: 200,
    transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
    background:
      "rgba(252, 143, 41, 1)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0 6px 10px 4px rgba(255, 105, 135, .3)",
      backgroundColor: "rgba(251, 186, 48, 1)"
    }
  }
}))(Button);

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

  /**
   * Back home
   */
  home = e => {
    e.preventDefault();
    this.props.backHome();
  };

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <React.Fragment>
          <h1 className="textTitleCard">
            {" "}
            Bienvenue au sein de la communauté Podroz, <br /> l'aventure ne fait
            que commencer !
          </h1>
          <p style={{ fontSize: "16px" }}>
            Nous vous remercions pour votre participation, Podroz se met sur
            pied grâce à vous !
            {/* Toutes ces informations nous permettent de faire évoluer Podroz afin de
            répondre au mieux à vos attentes et créer avec vous ... */}
            <br />
            Vous allez recevoir prochainement un email vous présentant un
            avant-goût de ce qu'est Podroz.
            <br />
            <br />
            La version 2 de Podroz arrive bientôt et vous en serez les premiers
            informés.
            <br />
            Vous trouverez davantage d'informations sur notre projet sur la page
            d'accueil.
            <br />
            <br />
            En attendant, n'hésitez pas à partager le concept Podroz à tous vos
            amis amateurs de voyages.
            <br />
            <br />
            Et si vous avez des questions c'est par là :&nbsp;
            <Obfuscate email="contact@podroz.fr" />
            <br />
            <br />
          </p>
          <h1 className="textTitleCard" style={{ fontSize: "30px" }}>
            {" "}
            Encore merci & à bientôt :) <br />
          </h1>

          {/* <Button size="small" onClick={this.home}>
            Retour à l'accueil
          </Button> */}
          <BackButton
            variant="contained"
            color="primary"
            onClick={this.home}
            style={{ marginBottom: "25px", marginTop: "25px" }}
          >
            RETOUR A L'ACCUEIL
          </BackButton>
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

export default FormTravelPref;
