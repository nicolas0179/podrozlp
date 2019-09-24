import React from "react";
import "./App.css";

import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";

import CustomForm from "./components/CustomForm";

import TitleImg from "../src/ressources/img/main-title.png";
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

function App(props) {
  const { classes } = props;

  return (
    <div className="App">
      <Grid container justify="center" style={{ opacity: "0.92" }}>
        <Grid item xs={12}>
          {/* <img className="imgTitle" src={TitleImg} alt="Texte de Podroz"/> */}
          <h1 className="textTitle">PODROZ</h1>
        </Grid>
        <Grid item xs={12}>
          <p className="textSubTitle, hit-the-floor">
            VOS VACANCES TAILLÉS SUR MESURE
          </p>
        </Grid>
        <Grid item justify="center">
          <Card
            style={{ overflow: "visible", borderRadius: "10px", width: "90vh" }}
            className={classes.card}
          >
            <p
              style={{
                paddingLeft: "30px",
                paddingRight: "30px",
                paddingTop: "30px",
                fontSize: "20px"
              }}
            >
              PODROZ est la première plateforme gratuite vous proposant des
              séjours qui vous correspondent
              <br></br>Du choix de la destination, jusqu'aux activités
              quotidiennes<br></br>Nous vous accompagnons pour tracer le séjour
              idéal !
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
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Tentez l'aventure !
            </Button>
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
            <CardContent>
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
