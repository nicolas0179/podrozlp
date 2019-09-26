import React from "react";
import "./App.css";

import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import { withStyles, rgbToHex } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";

import CustomForm from "./components/CustomForm";
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
    maxWidth: 1200,
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

function App(props) {
  const { classes } = props;

  return (
    <div className="App">
      <Grid container justify="center" style={{ opacity: "0.92" }}>
        <Grid item xs={12}>
          {/* <img className="imgTitle" src={TitleImg} alt="Texte de Podroz"/> */}
          <h1 className="textTitle" style={{textAlign:'center'}}>PODROZ</h1>
        </Grid>
        <Grid item xs={12}>
          <p className="textSubTitle, hit-the-floor" style={{textAlign:'center'}}>
            VOS VACANCES TAILLÉES SUR MESURE
          </p>
        </Grid>
        <Grid item>
          <Card
            // style={{ overflow: "visible", borderRadius: "10px", width: "60vw" }}
            className={classes.card}
          >
            <CardContent style={{position:'relative'}}>
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
