import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ReactGA from "react-ga";
import { Grid } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import Obfuscate from "react-obfuscate";
import Divider from "@material-ui/core/Divider";

// #####
/**
 * Style du bouton "Tenter l'aventure"
 */
const ColorButton = withStyles(theme => ({
  root: {
    fontWeight: 800,
    minWidth: 200,
    transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
    background:
      "linear-gradient(to right, #FFC371, #FF5F6D)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0 6px 10px 4px rgba(255, 105, 135, .3)"
    }
  }
}))(Button);

/**
 * Style CSS de la page
 */
const styles = {
  card: {
    minWidth: 400,
    maxWidth: 1200
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
  },
  margin: {
    textAlign: "center"
  }
};

/**
 * Fonction de navigation entre CARD
 */
function AccrocheText(props) {
  const { classes } = props;
  const continu = e => {
    e.preventDefault();
    ReactGA.event({
      category: "Go",
      action: "Tenter l'aventure"
    });
    props.nextStep();
  };

  /**
   * RENDU DE LA PAGE
   */
  return (
    <div style={{ textAlign: "center" }}>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <p
        style={{
          paddingLeft: "30px",
          paddingRight: "30px",
          paddingTop: "30px",
          fontSize: "20px"
        }}
      >
        {/* <a href={"#concept"}>Google</a> */}
        <span className="podrozInline">PODROZ</span> est la première plateforme
        gratuite vous proposant des séjours qui vous correspondent !
        <br />
        <br />
        Des vacances mais pas encore de destination ? En plus de vous aider à
        planifier vos séjours, Podroz vous propose des destinations et des
        activités qui vous plairont !
        <br />
        <br />
        <p
          style={{
            paddingLeft: "30px",
            paddingRight: "30px",
            fontSize: "20px"
          }}
        >
          Dites-nous qui vous êtes et nous vous dirons où aller ...
        </p>
        <ColorButton
          variant="contained"
          color="primary"
          className={classes.margin}
          onClick={continu}
          style={{ marginBottom: "50px" }}
        >
          Tenter l'aventure
        </ColorButton>
        <Grid container spacing={3} direction="column">
          <Divider variant="middle" />

          {/* Ancre pour aller direct à la partie Concept */}
          <a name="concept"></a>

          <h2>Comment ça marche ?</h2>

          <Grid item xs>
            <Icon
              style={{
                color: "rgb(246,103,103)",
                fontSize: "50px"
              }}
            >
              favorite
            </Icon>
            <p
              style={{
                color: "rgb(95,103,105)",
                fontSize: "18px",
                fontFamily: "Montserrat"
              }}
            >
              Renseignez vos préférences et votre historique de voyages
            </p>
            <p
              style={{
                color: "rgb(95,103,105)",
                fontSize: "18px"
              }}
            >
              <br />
              Le meilleur burger que vous avez goûté, le plus beau coucher de
              soleil auquel vous avez assisté, racontez-nous vos plus belles
              expériences de voyages, celles qui vous donnent envie de repartir.
            </p>
          </Grid>
          <Grid item xs>
            <Icon
              style={{
                color: "rgb(246,103,103)",
                fontSize: "50px"
              }}
            >
              receipt
            </Icon>
            <p
              style={{
                color: "rgb(95,103,105)",
                fontSize: "18px",
                fontFamily: "Montserrat"
              }}
            >
              Recevez une proposition personnalisée
            </p>

            <p
              style={{
                color: "rgb(95,103,105)",
                fontSize: "18px"
              }}
            >
              <br />
              En fonction de vos préférences, notre algorithme va sélectionner
              des destinations qui peuvent vous intéresser.
            </p>
          </Grid>
          <Grid item xs>
            <Icon
              style={{
                color: "rgb(246,103,103)",
                fontSize: "50px"
              }}
            >
              explore
            </Icon>

            <p
              style={{
                color: "rgb(95,103,105)",
                fontSize: "18px",
                fontFamily: "Montserrat"
              }}
            >
              Composez votre séjour{" "}
            </p>
            <p
              style={{
                color: "rgb(95,103,105)",
                fontSize: "18px"
              }}
            >
              <br />
              Parcourez les activités sélectionnées pour vous et sauvegardez
              celles qui vous intéressent. Composez ainsi pas à pas votre
              séjour.
            </p>
          </Grid>
          <Grid item xs>
            <Icon
              style={{
                color: "rgb(246,103,103)",
                fontSize: "50px"
              }}
            >
              flight_takeoff
            </Icon>
            <p
              style={{
                color: "rgb(95,103,105)",
                fontSize: "18px",
                fontFamily: "Montserrat"
              }}
            >
              Explorez, rencontrez, découvrez !{" "}
            </p>
            <p
              style={{
                color: "rgb(95,103,105)",
                fontSize: "18px"
              }}
            >
              Faites vos réservations, préparez votre valise et décollez pour
              votre destination !
            </p>
          </Grid>
        </Grid>
      </p>

      <div
        style={{
          position: "absolute",
          bottom: "0",
          right: "0",
          marginRight: "10px"
        }}
      >
        <p
          style={{
            fontSize: "15px",
            textAlign: "right"
          }}
        >
          {" "}
          Des questions ?{" "}
          <Obfuscate
            email="contact@podroz.fr"
            // headers={{
            //   subject: "react-obfuscate",
            // }}
          />
        </p>
      </div>
    </div>
  );
}
/**
 * Passage du propTypes
 */
AccrocheText.propTypes = {
  classes: PropTypes.object.isRequired
};

/**
 * Export de la classe
 */
export default withStyles(styles)(AccrocheText);
