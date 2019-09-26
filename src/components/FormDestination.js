import React, { Component } from "react";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import AppBar from "@material-ui/core/AppBar";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Toolbar, Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import axios from "axios";

import PropTypes from "prop-types";
import clsx from "clsx";
import {
  emphasize,
  // makeStyles,
  // useTheme,
  withStyles
} from "@material-ui/core/styles";
// import NoSsr from "@material-ui/core/NoSsr";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import CancelIcon from "@material-ui/icons/Cancel";
import Select from "react-select";

import { red } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";

import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";

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

// const useStyles = makeStyles(theme => ({
const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250,
    minWidth: 290
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
// )

// const options = [
//   { label: "Afghanistan" },
//   { label: "Aland Islands" },
//   { label: "Albania" },
//   { label: "Algeria" },
//   { label: "American Samoa" },
//   { label: "Andorra" },
//   { label: "Angola" },
//   { label: "Anguilla" },
//   { label: "Antarctica" },
//   { label: "Antigua and Barbuda" },
//   { label: "Argentina" },
//   { label: "Armenia" },
//   { label: "Aruba" },
//   { label: "Australia" },
//   { label: "Austria" },
//   { label: "Azerbaijan" },
//   { label: "Bahamas" },
//   { label: "Bahrain" },
//   { label: "Bangladesh" },
//   { label: "Barbados" },
//   { label: "Belarus" },
//   { label: "Belgium" },
//   { label: "Belize" },
//   { label: "Benin" },
//   { label: "Bermuda" },
//   { label: "Bhutan" },
//   { label: "Bolivia, Plurinational State of" },
//   { label: "Bonaire, Sint Eustatius and Saba" },
//   { label: "Bosnia and Herzegovina" },
//   { label: "Botswana" },
//   { label: "Bouvet Island" },
//   { label: "Brazil" },
//   { label: "British Indian Ocean Territory" },
//   { label: "Brunei Darussalam" }
// ].map(option => ({
//   value: option.label,
//   label: option.label
// }));

const options2 = [
  { label: "Nature" },
  { label: "Plage" },
  { label: "Shopping" },
  { label: "Monuments historiques" },
  { label: "Concerts" },
  { label: "Festivals" },
  { label: "Musées" },
  { label: "Randonnées" },
  { label: "Gastronomie" }
].map(option => ({
  value: option.label,
  label: option.label
}));

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
  // innerRef: PropTypes.oneOfType([
  //   PropTypes.oneOf([null]),
  //   PropTypes.func,
  //   PropTypes.shape({
  //     current: PropTypes.any.isRequired
  //   })
  // ]).isRequired,
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

// function SingleValue(props) {
//   return (
//     <Typography
//       className={props.selectProps.classes.singleValue}
//       {...props.innerProps}
//     >
//       {props.children}
//     </Typography>
//   );
// }

// SingleValue.propTypes = {
//   /**
//    * The children to be rendered.
//    */
//   children: PropTypes.node,
//   /**
//    * Props passed to the wrapping element for the group.
//    */
//   innerProps: PropTypes.any.isRequired,
//   selectProps: PropTypes.object.isRequired
// };

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
// const classes = useStyles();
// const theme = useTheme();
class FormDestination extends Component {
  constructor(props) {
    super(props);
    this.state = { countries: [] };
  }

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };
  componentDidMount() {
    axios
      .get("http://localhost:5000/pays")
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
      handleChange,
      handleCountryChange,
      handleThemeChange,
      handleCheck
    } = this.props;

    // const [multi, setMulti] = React.useState(values.selectedOption);

    // const handleChangeMulti = value => {
    //   setMulti(value);
    //   console.log(multi);
    // };

    const continu = e => {
      e.preventDefault();
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
          {/* <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6">Enter User Destination</Typography>
            </Toolbar>
          </AppBar> */}
          <form>
            {/* <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">Moyens de transport</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.avion}
                      onChange={handleCheck("avion")}
                      value="avion"
                    />
                  }
                  label="Avion"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.train}
                      onChange={handleCheck("train")}
                      value="train"
                    />
                  }
                  label="Train"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.voiture}
                      onChange={handleCheck("voiture")}
                      value="voiture"
                    />
                  }
                  label="Voiture"
                />
              </FormGroup>
            </FormControl> */}

            {/* <Select
            options={options}
            onChange={handleCountryChange}
            value={values.selectedOption}
          /> */}
            <br />
            <Grid container justify="center" spacing={3}>
              <Grid item xs={2}>
                <Icon
                  style={{
                    color: "pink",
                    fontSize: "75px",
                    transform: "rotate(45deg)"
                  }}
                >
                  airplanemode_active
                </Icon>
              </Grid>
              <Grid item xs={10}>
                <h1 className="textTitleCard">
                  Dites-nous en plus sur vos destinations favorites
                </h1>
              </Grid>
            </Grid>
            <br />
            <Select
              classes={classes}
              styles={selectStyles}
              inputId="react-select-multiple"
              TextFieldProps={{
                label: "Mes pays favoris",
                InputLabelProps: {
                  htmlFor: "react-select-multiple",
                  shrink: true
                }
              }}
              placeholder="Sélectionnez vos pays favoris"
              options={this.state.countries.map(currentCountry => ({
                value: currentCountry.Pays,
                label: currentCountry.Pays
              }))}
              components={components}
              value={values.selectedOption}
              onChange={handleCountryChange}
              isMulti
            />
            <br />
            <Select
              classes={classes}
              styles={selectStyles}
              inputId="react-select-multiple"
              TextFieldProps={{
                label: "Types d'activités",
                InputLabelProps: {
                  htmlFor: "react-select-multiple",
                  shrink: true
                }
              }}
              placeholder="Choisissez vos thématiques préférées"
              options={options2}
              components={components}
              value={values.selectedOption2}
              onChange={handleThemeChange}
              isMulti
            />
            <br />
            <Button
              variant="contained"
              //color="primary"
              style={styles.button}
              onClick={this.back}
              spacing={1}
            >
              Précédent
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={styles.button}
              onClick={continu}
            >
              Continuer
            </Button>
          </form>
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(FormDestination);
