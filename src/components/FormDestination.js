import React, { Component } from "react";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
// import AppBar from "@material-ui/core/AppBar";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import axios from "axios";

import PropTypes from "prop-types";
import clsx from "clsx";
import { emphasize, withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import CancelIcon from "@material-ui/icons/Cancel";
import Select from "react-select";

import { red } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";

import MobileStepper from "@material-ui/core/MobileStepper";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

import ReactGA from "react-ga";

// A custom theme for this app
const theme = createMuiTheme({
  overrides: {
    MuiLinearProgress: {
      colorPrimary: {
        // background: "grey"
      },
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

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250,
    minWidth: 290
  },
  stepper: {
    flexGrow: 1,
    margin: theme.spacing(3)
  },
  labelStyle: {
    color: "rgb(220,220,220)",
    fontSize: "12px"
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
    margin: theme.spacing(3)
  },
  button: {
    margin: theme.spacing(3)
  }
});

const optionsActivities = [
  { label: "Bien-être et détente" },
  { label: "Concerts, spectacles et festivals" },
  { label: "Culture et musées" },
  { label: "Gastronomie" },
  { label: "Nature et activités de plein air" },
  { label: "Plage" },
  { label: "Shopping" },
  { label: "Vie nocturne" }
].map(option => ({
  value: option.label,
  label: option.label
}));

const optionsStayLength = [
  { label: "Quelques jours" },
  { label: "Inférieure à 2 semaines" },
  { label: "De 2 semaines à 1 mois" },
  { label: "Supérieure à 1 mois" }
].map(option => ({
  value: option.label,
  label: option.label
}));

const optionsEntourage = [
  { label: "En Famille" },
  { label: "Entre Amis" },
  { label: "En Couple" },
  { label: "En Solo" },
  { label: "Avec enfant(s)" }
].map(option => ({
  value: option.label,
  label: option.label
}));

/******************************************
 *** Components pour le multiple select ***
 ******************************************/

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

NoOptionsMessage.propTypes = {
  /**
   * The children to be rendered.
   */
  children: PropTypes.node,
  /**
   * Props to be passed on to the wrapper.
   */
  innerProps: PropTypes.object.isRequired,
  selectProps: PropTypes.object.isRequired
};

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

inputComponent.propTypes = {
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.any.isRequired
    })
  ])
};

function Control(props) {
  const {
    children,
    innerProps,
    innerRef,
    selectProps: { classes, TextFieldProps }
  } = props;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: classes.input,
          ref: innerRef,
          children,
          ...innerProps
        }
      }}
      {...TextFieldProps}
    />
  );
}

Control.propTypes = {
  /**
   * Children to render.
   */
  children: PropTypes.node,
  /**
   * The mouse down event and the innerRef to pass down to the controller element.
   */
  innerProps: PropTypes.shape({
    onMouseDown: PropTypes.func.isRequired
  }).isRequired,
  innerRef: PropTypes.oneOfType([
    PropTypes.oneOf([null]),
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.any.isRequired
    })
  ]).isRequired,
  selectProps: PropTypes.object.isRequired
};

function Option(props) {
  return (
    <MenuItem
      ref={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

Option.propTypes = {
  /**
   * The children to be rendered.
   */
  children: PropTypes.node,
  /**
   * props passed to the wrapping element for the group.
   */
  innerProps: PropTypes.shape({
    id: PropTypes.string.isRequired,
    // key: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    onMouseMove: PropTypes.func.isRequired,
    onMouseOver: PropTypes.func.isRequired,
    tabIndex: PropTypes.number.isRequired
  }).isRequired,
  /**
   * Inner ref to DOM Node
   */

  /**
   * Whether the option is focused.
   */
  isFocused: PropTypes.bool.isRequired,
  /**
   * Whether the option is selected.
   */
  isSelected: PropTypes.bool.isRequired
};

function Placeholder(props) {
  const { selectProps, innerProps = {}, children } = props;
  return (
    <Typography
      color="textSecondary"
      style={{ fontSize: "12px", color: "rgb(220,220,220)" }}
      className={selectProps.classes.placeholder}
      {...innerProps}
    >
      {children}
    </Typography>
  );
}

Placeholder.propTypes = {
  /**
   * The children to be rendered.
   */
  children: PropTypes.node,
  /**
   * props passed to the wrapping element for the group.
   */
  innerProps: PropTypes.object,
  selectProps: PropTypes.object.isRequired
};

function ValueContainer(props) {
  return (
    <div className={props.selectProps.classes.valueContainer}>
      {props.children}
    </div>
  );
}

ValueContainer.propTypes = {
  /**
   * The children to be rendered.
   */
  children: PropTypes.node,
  selectProps: PropTypes.object.isRequired
};

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={clsx(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}

MultiValue.propTypes = {
  children: PropTypes.node,
  isFocused: PropTypes.bool.isRequired,
  removeProps: PropTypes.shape({
    onClick: PropTypes.func.isRequired,
    onMouseDown: PropTypes.func.isRequired,
    onTouchEnd: PropTypes.func.isRequired
  }).isRequired,
  selectProps: PropTypes.object.isRequired
};

function Menu(props) {
  return (
    <Paper
      square
      className={props.selectProps.classes.paper}
      {...props.innerProps}
    >
      {props.children}
    </Paper>
  );
}

Menu.propTypes = {
  /**
   * The children to be rendered.
   */
  children: PropTypes.element.isRequired,
  /**
   * Props to be passed to the menu wrapper.
   */
  innerProps: PropTypes.object.isRequired,
  selectProps: PropTypes.object.isRequired
};

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  // SingleValue,
  ValueContainer
};

/******************************
 *** Classe FormDestination ***
 ******************************/

class FormDestination extends Component {
  constructor(props) {
    super(props);
    this.state = { countries: [] };
  }

  /**
   * Fonction de retour dans la navigation des cards
   */
  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  /**
   * Récupération de la BDD de pays pour l'afficher dans les options du Select
   */
  componentDidMount() {
    axios
      .get("http://api.podroz.fr/pays")
      .then(response => {
        this.setState({ countries: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { classes } = this.props;
    const {
      values,
      handleCountryChange,
      handleTripChange,
      handleStayLengthChange,
      handleEntourageChange
    } = this.props;

    /**
     * Fonction suivant dans la navigation des cards
     */
    const continu = e => {
      e.preventDefault();
      ReactGA.event({
        category: "Continue",
        action: "Go to last step"
      });
      this.props.nextStep();
    };

    const selectStyles = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary,
        "& input": {
          font: "inherit"
        }
      })
    };
    return (
      <MuiThemeProvider theme={theme}>
        <React.Fragment>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
          {/* <div style={{ textAlign: "center" }}> */}
          <form>
            <br />
            <Grid spacing={1} container direction="row">
              <Grid
                item
                xs={2}
                container
                justify="flex-end"
                alignItems="center"
              >
                <Icon
                  row
                  style={{
                    color: "rgb(242,76,2)",
                    fontSize: "75px",
                    transform: "rotate(45deg)"
                  }}
                >
                  airplanemode_active
                </Icon>
              </Grid>
              <Grid
                item
                xs={10}
                container
                justify="flex-start"
                alignItems="center"
              >
                <h1 className="textTitleCard">
                  Dites-nous en plus sur les destinations qui vous ont marquées
                </h1>
              </Grid>
            </Grid>
            <p style={{ fontSize: "14px" }}>
              Vous pouvez renseigner{" "}
              <b style={{ fontSize: "15px" }}>1, 2 ou 3 destinations</b>, et
              pour chacune d'entres elles, précisez quelle(s) activité(s) vous
              ont motivées à partir{" "}
            </p>
            <Grid spacing={1} container direction="row" justify="center">
              <Grid
                item
                xs={3}
                container
                justify="center"
                alignItems="flex-start"
              >
                <TextField
                  fullWidth
                  id="stayLength"
                  select
                  label="Durée du séjour"
                  value={values.trip1.stayLength ? values.trip1.stayLength : ""}
                  onChange={handleStayLengthChange("trip1")}
                >
                  {optionsStayLength.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={4}>
                <Select
                  classes={classes}
                  styles={selectStyles}
                  inputId="react-select-multiple"
                  TextFieldProps={{
                    label: "Pays",
                    InputLabelProps: {
                      htmlFor: "react-select-multiple",
                      shrink: true
                    }
                  }}
                  placeholder="Ex : Italie"
                  options={this.state.countries.map(currentCountry => ({
                    value: currentCountry.Pays,
                    label: currentCountry.Pays
                  }))}
                  components={components}
                  value={
                    values.trip1.country
                      ? {
                          label: values.trip1.country,
                          value: values.trip1.country
                        }
                      : ""
                  }
                  onChange={handleCountryChange("trip1")}
                />
              </Grid>
              <Grid item xs={5}>
                <Select
                  classes={classes}
                  styles={selectStyles}
                  inputId="react-select-multiple"
                  TextFieldProps={{
                    label: "Activité(s)",
                    InputLabelProps: {
                      htmlFor: "react-select-multiple",
                      shrink: true
                    }
                  }}
                  placeholder="Ex : Soirée, Plage, ..."
                  options={optionsActivities}
                  components={components}
                  value={
                    values.trip1.activities
                      ? values.trip1.activities.map(x => ({
                          value: x.activity,
                          label: x.activity
                        }))
                      : ""
                  }
                  onChange={handleTripChange("trip1")}
                  isMulti
                />
              </Grid>
            </Grid>
            <br />
            <Grid spacing={1} container direction="row" justify="flex-end">
              <Grid item xs={3} container justify="center" alignItems="center">
                <TextField
                  fullWidth
                  id="stayLength"
                  select
                  label="Durée du séjour"
                  className={classes.textField}
                  value={values.trip2.stayLength ? values.trip2.stayLength : ""}
                  onChange={handleStayLengthChange("trip2")}
                >
                  {optionsStayLength.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={4}>
                <Select
                  classes={classes}
                  styles={selectStyles}
                  inputId="react-select-multiple"
                  TextFieldProps={{
                    label: "Pays",
                    InputLabelProps: {
                      htmlFor: "react-select-multiple",
                      shrink: true
                    }
                  }}
                  placeholder="Ex : Japon"
                  options={this.state.countries.map(currentCountry => ({
                    value: currentCountry.Pays,
                    label: currentCountry.Pays
                  }))}
                  components={components}
                  value={
                    values.trip2.country
                      ? {
                          label: values.trip2.country,
                          value: values.trip2.country
                        }
                      : ""
                  }
                  onChange={handleCountryChange("trip2")}
                />
              </Grid>
              <Grid item xs={5}>
                <Select
                  classes={classes}
                  styles={selectStyles}
                  inputId="react-select-multiple"
                  TextFieldProps={{
                    label: "Activité(s)",
                    InputLabelProps: {
                      htmlFor: "react-select-multiple",
                      shrink: true
                    }
                  }}
                  placeholder="Ex : Nature, Gastronomie, ..."
                  options={optionsActivities}
                  components={components}
                  value={
                    values.trip2.activities
                      ? values.trip2.activities.map(x => ({
                          value: x.activity,
                          label: x.activity
                        }))
                      : ""
                  }
                  onChange={handleTripChange("trip2")}
                  isMulti
                />
              </Grid>
            </Grid>
            <br />
            <Grid spacing={1} container direction="row" justify="flex-end">
              <Grid item xs={3} container justify="center" alignItems="center">
                <TextField
                  fullWidth
                  id="stayLength"
                  select
                  label="Durée du séjour"
                  className={classes.textField}
                  value={values.trip3.stayLength ? values.trip3.stayLength : ""}
                  onChange={handleStayLengthChange("trip3")}
                >
                  {optionsStayLength.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={4}>
                <Select
                  classes={classes}
                  styles={selectStyles}
                  inputId="react-select-multiple"
                  TextFieldProps={{
                    label: "Pays",
                    InputLabelProps: {
                      htmlFor: "react-select-multiple",
                      shrink: true
                    }
                  }}
                  placeholder="Ex : Mexique"
                  options={this.state.countries.map(currentCountry => ({
                    value: currentCountry.Pays,
                    label: currentCountry.Pays
                  }))}
                  components={components}
                  value={
                    values.trip3.country
                      ? {
                          label: values.trip3.country,
                          value: values.trip3.country
                        }
                      : ""
                  }
                  onChange={handleCountryChange("trip3")}
                />
              </Grid>
              <Grid item xs={5}>
                <Select
                  classes={classes}
                  styles={selectStyles}
                  inputId="react-select-multiple"
                  TextFieldProps={{
                    label: "Activité(s)",
                    InputLabelProps: {
                      htmlFor: "react-select-multiple",
                      shrink: true
                    }
                  }}
                  placeholder="Ex : Musées, Monuments,..."
                  options={optionsActivities}
                  components={components}
                  value={
                    values.trip3.activities
                      ? values.trip3.activities.map(x => ({
                          value: x.activity,
                          label: x.activity
                        }))
                      : ""
                  }
                  onChange={handleTripChange("trip3")}
                  isMulti
                />
              </Grid>
            </Grid>
            <br />
            <p style={{ fontSize: "14px", margin: "24px" }}>
              De manière générale, qui sont vos compagnons de voyage ?
              <br />
              (plusieurs choix possibles){" "}
            </p>
            <Grid spacing={3} container direction="row" justify="center">
              <Grid item xs={8}>
                <Select
                  fullWidth
                  classes={classes}
                  styles={selectStyles}
                  inputId="react-select-multiple"
                  TextFieldProps={{
                    label: "Entourage",
                    InputLabelProps: {
                      htmlFor: "react-select-multiple",
                      shrink: true
                    }
                  }}
                  placeholder="Ex : En Famille, Avec enfant(s)"
                  options={optionsEntourage}
                  components={components}
                  value={
                    values.entourage
                      ? values.entourage.map(x => ({
                          value: x.entourageCategory,
                          label: x.entourageCategory
                        }))
                      : ""
                  }
                  onChange={handleEntourageChange}
                  isMulti
                />
              </Grid>
            </Grid>
            <MobileStepper
              variant="progress"
              steps={3}
              position="static"
              activeStep={values.step}
              className={classes.stepper}
              nextButton={
                <Button size="small" onClick={continu}>
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
          {/* </div> */}
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(FormDestination);
