import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

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
    props.nextStep();
  };

  /**
   * RENDU DE LA PAGE
   */
  return (
    <div style={{ textAlign: "center" }}>
      <p
        style={{
          paddingLeft: "30px",
          paddingRight: "30px",
          paddingTop: "30px",
          fontSize: "20px"
        }}>
        PODROZ est la première plateforme gratuite vous proposant des séjours
        qui vous correspondent
        <br />
        <br />
        Du choix de la destination, jusqu'aux activités quotidiennes en passant
        par le logement... Nous vous accompagnons pour tracer le séjour idéal !
      </p>
      <p
        style={{
          paddingLeft: "30px",
          paddingRight: "30px",
          fontSize: "20px"
        }}>
        Dites-nous qui vous êtes et nous vous dirons où aller :
      </p>
      <ColorButton
        variant="contained"
        color="primary"
        className={classes.margin}
        onClick={continu}
        style={{ marginBottom: "50px" }}>
        Tentez l'aventure
      </ColorButton>
      <div
        style={{
          position: "absolute",
          bottom: "0",
          right: "0",
          marginRight: "10px"
        }}>
        <p
          style={{
            fontSize: "15px",
            textAlign: "right"
          }}>
          {" "}
          Des questions ? contact@waterbot.fr
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
