import React, { Component } from "react";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import AppBar from "@material-ui/core/AppBar";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Toolbar } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from '@material-ui/core/styles';
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import FormLabel from "@material-ui/core/FormLabel";
import PropTypes from "prop-types";
import Icon from "@material-ui/core/Icon";
import { useTheme, withStyles } from "@material-ui/core/styles";
import InputAdornment from '@material-ui/core/InputAdornment';
import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import {
  emphasize,
  // makeStyles,
  // useTheme,
} from "@material-ui/core/styles";
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

const styles = {
  textField: {
    marginLeft: 24,
    marginRight: 24,
    width: "17vw"
  },
  textFieldAge: {
    marginLeft: 24,
    marginRight: 24,
    width: "17vw"
  },
  textFieldEmail: {
    marginLeft: 24,
    marginRight: 24,
    width: '30vw',

  },
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
    margin: theme.spacing(1)
  },
  button: {
    margin: theme.spacing(0)
  }
};


export class FormTravelPref extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };
  
UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
        this.setState({
          errors: nextProps.errors
        });
      }
    }

  render() {
    const { classes, errors } = this.props;

    const { values, handleChange } = this.props;

    return (
      <MuiThemeProvider>
        <React.Fragment>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
          {/* <AppBar position="static">
            <Toolbar style = {{backgroundColor:"white"}}>
              <IconButton edge="start" color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              
              <Typography variant="h6">Enter User Destination</Typography>
            </Toolbar>      
          </AppBar> */}
          <Grid spacing={1}container direction="row">
              <Grid item xs={5} container justify="flex-end" alignItems="center">
                <Icon
                  style={{
                    color: "pink",
                    fontSize: "75px",
                    transform: "rotate(-20deg)",
                  }}
                >face</Icon>
              </Grid>
              <Grid item xs={7} container justify="flex-start" alignItems="center" >
                <h1 className="textTitleCard">Qui êtes vous ?</h1>
              </Grid>
            </Grid>
          
          <form>
            {/* <FormControl component="fieldset" className={classes.formControl}> */}

            <Grid container spacing={1}>
              <Grid item xs={6}>
                <FormControl className={classes.formControl}>
                  <TextField
                    id="firstName"
                    label="Prénom"
                    onChange={handleChange("firstName")}
                    defaultValue={values.firstName}
                    className={classes.textField}
                    variant="outlined"
                  />
                </FormControl>
              </Grid>
              <Grid
                item
                xs={6}
                justify="flex-start"
                alignItems="flex-start"
                alignContent="flex-start"
              >
                <FormControl className={classes.formControl}>
                  <TextField
                    id="lastName"
                    label="Nom"
                    onChange={handleChange("lastName")}
                    defaultValue={values.lastName}
                    className={classes.textField}
                    variant="outlined"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl className={classes.formControl}>
                  <TextField
                    id="age"
                    label="Age"
                    onChange={handleChange("age")}
                    defaultValue={values.age}
                    type="number"
                    className={classes.textFieldAge}
                    variant="outlined"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl className={classes.formControl}>
                  <TextField
                    id="sexe"
                    select
                    label="Sexe"
                    className={classes.textField}
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

                  {/* <InputLabel htmlFor="age-native-required">Sexe</InputLabel>
              <Select
                variant="outlined"
                native
                value={values.sex}
                onChange={handleChange('sex')}
                inputProps={{
                  name: 'age',
                  id: 'age-native-simple',
                }}
              >
                <option value=""/>
                <option value="homme">Homme</option>
                <option value="femme">Femme</option>
                <option value="autre">Autre</option>
              </Select> */}
                </FormControl>
              </Grid>
              <Grid item xs={12} container justify="center" alignItems="center" >
                <FormControl className={classes.formControl}>
                  <TextField
                    id="email"
                    label="Email"
                    //onChange={handleChange("email")}
                    defaultValue={values.email}
                    type="email"
                    className={classes.textFieldEmail}
                    variant="outlined"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">@</InputAdornment>,
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <br/>
            <Grid container direction="row">
              <Grid item xs={6} container justify="flex-start" alignItems="center">
                <Button
                  variant="contained"
                  //color="primary"
                  style={styles.button}
                  onClick={this.back}
                  spacing={1}
                >
                  <Icon
                  style={{
                    fontSize: "35px",
                  }}
                >navigate_before</Icon>
                </Button>
              </Grid>
              <Grid item xs={6} container justify="flex-end" alignItems="center">
                <Button
                  variant="contained"
                  style={styles.button}
                  onClick={this.continue}
                  spacing={1}
                  type="submit"
                >
                  <Icon
                  style={{
                    fontSize: "35px",
                  }}
                >navigate_next</Icon>
                </Button>
              </Grid>
            </Grid>
            
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
