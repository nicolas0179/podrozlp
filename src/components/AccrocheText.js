import React from "react";

import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import { withStyles, rgbToHex } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";

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
    // color: 'rgba(255,255,255,1)',
    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    // '&:hover': {
    //   background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    //   boxShadow: '0 6px 10px 4px rgba(255, 105, 135, .3)',
    // },
  }
}))(Button);

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
  }
};

function AccrocheText(props) {
  const { classes } = props;
  const continu = e => {
    e.preventDefault();
    props.nextStep();
  };

  return (
    <div>
      <p
        style={{
          paddingLeft: "30px",
          paddingRight: "30px",
          paddingTop: "30px",
          fontSize: "20px"
        }}
      >
        PODROZ est la première plateforme gratuite vous proposant des séjours
        qui vous correspondent
        <br></br>Du choix de la destination, jusqu'aux activités quotidiennes
        <br></br>Nous vous accompagnons pour tracer le séjour idéal !
      </p>
      <p
        style={{
          paddingLeft: "30px",
          paddingRight: "30px",
          fontSize: "20px"
        }}
      >
        Dites-nous qui vous êtes et nous vous dirons où aller :
      </p>
      <ColorButton
        variant="contained"
        color="primary"
        className={classes.margin}
        onClick={continu}
      >
        Tentez l'aventure
      </ColorButton>
      <p
        style={{
          fontSize: "15px",
          textAlign: "right",
          verticalAlign: "bottom",
          paddingTop: "40px",
          paddingRight: "20px",
          paddingBottom: "10px"
        }}
      >
        {" "}
        Mentions légales - Contact
      </p>
    </div>
  );
}

AccrocheText.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AccrocheText);
// export default AccrocheText;
