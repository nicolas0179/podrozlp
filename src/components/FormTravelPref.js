import React, { Component } from "react";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
// import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import Icon from "@material-ui/core/Icon";
import { withStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import { emphasize } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

/**
 * Création du Mui Theme
 */
const theme = createMuiTheme({
  overrides: {
    MuiLinearProgress: {
      barColorPrimary: {
        // background: "linear-gradient(to right, #FFC371, #FF5F6D)"
        backgroundColor: "rgb(242,76,2)"
      }
    }
  },
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

/**
 * Création de la liste des sexes
 */
const sex_options = [
  {
    value: "femme",
    label: "Femme"
  },
  {
    value: "homme",
    label: "Homme"
  },
  {
    value: "autre",
    label: "Autre"
  }
];

/**
 * Création des styles CSS pour ce component
 */
const styles = {
  textField: {
    marginLeft: 24,
    marginRight: 24,
    width: "30vw"
  },
  textFieldShort: {
    marginLeft: 24,
    marginRight: 24,
    width: "20vw"
  },
  root: {
    flexGrow: 1,
    height: 250,
    minWidth: 290
  },
  stepper: {
    flexGrow: 1,
    margin: theme.spacing(3)
  },
  input: {
    display: "flex",
    padding: 0,
    height: "auto"
  },
  valueContainer: {
    display: "flex",
    flexWrap: "wrap",
    flex: 1,
    alignItems: "center",
    overflow: "hidden"
  },
  chip: {
    margin: theme.spacing(0.5, 0.25)
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === "light"
        ? theme.palette.grey[300]
        : theme.palette.grey[700],
      0.08
    )
  },
  noOptionsMessage: {
    padding: theme.spacing(1, 2)
  },
  singleValue: {
    fontSize: 16
  },
  placeholder: {
    position: "absolute",
    left: 2,
    bottom: 6,
    fontSize: 16
  },
  paper: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0
  },
  divider: {
    height: theme.spacing(2)
  },
  formControl: {
    margin: theme.spacing(1)
  },
  button: {
    margin: theme.spacing(0)
  }
};

/**
 * Déclaration de la class component
 */
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
   *
   */
  // UNSAFE_componentWillReceiveProps(nextProps) {
  //   if (nextProps.errors) {
  //     this.setState({
  //       errors: nextProps.errors
  //     });
  //   }
  // }

  /**
   * Fonction de rendu du component
   */
  render() {
    /**
     * Déclaration des constantes
     */
    const { classes } = this.props;

    const { values, handleChange, handleSubmit } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <React.Fragment>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />

          <Grid spacing={1} container direction="row">
            <Grid item xs={5} container justify="flex-end" alignItems="center">
              <Icon
                style={{
                  color: "rgb(252,76,2)",
                  fontSize: "75px",
                  transform: "rotate(-20deg)"
                }}
              >
                face
              </Icon>
            </Grid>
            <Grid
              item
              xs={7}
              container
              justify="flex-start"
              alignItems="center"
            >
              <h1 className="textTitleCard">Qui êtes vous ?</h1>
            </Grid>
          </Grid>

          <form>
            <Grid container spacing={1} justify="center" alignItems="center">
              <Grid item xs={8}>
                <FormControl className={classes.formControl}>
                  <TextField
                    id="name"
                    label="Nom complet"
                    onChange={handleChange("name")}
                    defaultValue={values.name}
                    className={classes.textField}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Icon style={{ color: "rgb(220,220,220)" }}>
                            perm_identity
                          </Icon>
                        </InputAdornment>
                      )
                    }}
                  />
                </FormControl>
              </Grid>
              {/* <Grid item xs={6}>
                <FormControl className={classes.formControl}>
                  <TextField
                    id="lastName"
                    label="Nom"
                    onChange={handleChange("lastName")}
                    defaultValue={values.lastName}
                    className={classes.textField}
                    variant="outlined"
                    InputProps={{
                      style: { minWidth: "15vw" },
                      startAdornment: (
                        <InputAdornment position="start">
                          <Icon style={{ color: "rgb(220,220,220)" }}>
                            perm_identity
                          </Icon>
                        </InputAdornment>
                      )
                    }}
                  />
                </FormControl>
              </Grid> */}
              <Grid item xs={8}>
                <FormControl className={classes.formControl}>
                  <TextField
                    id="age"
                    label="Age"
                    onChange={handleChange("age")}
                    defaultValue={values.age}
                    className={classes.textFieldShort}
                    variant="outlined"
                  />
                  {/* <FormHelperText
                    style={{ color: "red" }}
                    id="component-error-text"
                  >
                    {values.errorText}
                  </FormHelperText> */}
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl className={classes.formControl}>
                  <TextField
                    id="sexe"
                    select
                    label="Sexe"
                    className={classes.textFieldShort}
                    value={values.sex}
                    onChange={handleChange("sex")}
                    variant="outlined"
                  >
                    {sex_options.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl className={classes.formControl}>
                  <TextField
                    id="email"
                    label="Email"
                    onChange={handleChange("email")}
                    defaultValue={values.email}
                    type="email"
                    className={classes.textField}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Icon style={{ color: "rgb(220,220,220)" }}>
                            email
                          </Icon>
                        </InputAdornment>
                      )
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            <MobileStepper
              variant="progress"
              steps={3}
              position="static"
              activeStep={values.step}
              className={classes.stepper}
              nextButton={
                <Button size="small" onClick={handleSubmit}>
                  Envoyer
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )}
                </Button>
              }
              backButton={
                <Button size="small" onClick={this.back}>
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                  ) : (
                    <KeyboardArrowLeft />
                  )}
                </Button>
              }
            />
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
