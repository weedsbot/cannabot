import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Strains from "../services/Strains";
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core/styles/colorManipulator";
import Button from "@material-ui/core/Button";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const styles = theme => ({
  button: {
    margin: 20,
    minWidth: 200,
    height: 55
  },
  input: {
    display: "none"
  },
  container: {
    display: "flex",
    backgroundColor: "rgba(100,100,100,0.2)",
    heigth: "20vh",
    // marginTop: "10vh",
    justifyContent: "left",
    alignItems: "center",
    flexWrap: "wrap"
  },
  root: {
    width: "100%"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    margin: 10,
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.25),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.45)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: "100%",
    height: 55,
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit * 3,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    height: "100%",
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    height: "100%",
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "100%"
    }
  },
  formControl: {
    margin: 20,
    minWidth: 200
  },
  form : {
    paddingTop:'2.5vh',
  }
});

class Filters extends Component {
  constructor(props) {
    super(props);
    this.strainservice = new Strains();
    this.state = {
      name: "",
      allRaces: "",
      race: "",
      medical_effects: "",
      medical: "",
      positive_effects: "",
      positive: "",
      allFlavors: "",
      flavour: ""
    };

    this.setRaces();
    this.setFlavors();
    this.setEffects(["medical_effects", "positive_effects"]);
  }

  setRaces = () => {
    return this.strainservice.findRaces().then(races => {
      this.setState({
        ...this.state,
        allRaces: races
      });
    });
  };

  setFlavors = () => {
    return this.strainservice.findFlavors().then(flavors => {
      this.setState({
        ...this.state,
        allFlavors: flavors
      });
    });
  };

  setEffects = array => {
    array.forEach(effect => {
      this.strainservice.findEffects(effect).then(effects => {
        this.setState({
          ...this.state,
          [effect]: effects
        });
      });
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const name = this.state.name;
    const race = this.state.race;
    const medical = this.state.medical;
    const positive = this.state.positive;
    const flavour = this.state.flavour;

    this.strainservice
      .filterStrains(name, race, medical, positive, flavour)
      .then(response => {
        this.props.setFilteredStrains(response);
      })
      .catch(error => error);
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  render() {
    return (
      <div className={this.props.classes.container}>
        <form
          onSubmit={this.handleFormSubmit}
          className={this.props.classes.form}
        >
          <div className={this.props.classes.search}>
            <InputBase
              value={this.state.name}
              onChange={this.handleChange("name")}
              variant="outlined"
              placeholder="Search…"
              classes={{
                root: this.props.classes.inputRoot,
                input: this.props.classes.inputInput
              }}
            />
          </div>
          <FormControl
            variant="outlined"
            className={this.props.classes.formControl}
          >
            <InputLabel label>Flavour</InputLabel>
            <Select

              native
              value={this.state.flavour}
              onChange={this.handleChange("flavour")}
              input={<OutlinedInput name="flavour" />}
              
            >
              <option value="" />
              {this.state.allFlavors !== ""
                ? this.state.allFlavors.map(effect => {
                    return <option value={effect}>{effect}</option>;
                  })
                : ""}
            </Select>
          </FormControl>
          <FormControl
            variant="outlined"
            className={this.props.classes.formControl}
          >
            <InputLabel>Race</InputLabel>
            <Select
              native
              value={this.state.race}
              onChange={this.handleChange("race")}
              input={<OutlinedInput name="race" />}
            >
              <option value="" />
              {this.state.allRaces !== ""
                ? this.state.allRaces.map(race => {
                    return <option value={race}>{race}</option>;
                  })
                : ""}
            </Select>
          </FormControl>
          <FormControl
            variant="outlined"
            className={this.props.classes.formControl}
          >
            <InputLabel>Medical effects</InputLabel>
            <Select
              native
              value={this.state.medical}
              onChange={this.handleChange("medical")}
              input={<OutlinedInput name="medical" />}
            >
              <option value="" />
              {this.state.medical_effects !== ""
                ? this.state.medical_effects.map(effect => {
                    return <option value={effect}>{effect}</option>;
                  })
                : ""}
            </Select>
          </FormControl>
          <FormControl
            variant="outlined"
            className={this.props.classes.formControl}
          >
            <InputLabel>Positive effects</InputLabel>
            <Select
              native
              value={this.state.positive}
              onChange={this.handleChange("positive")}
              input={<OutlinedInput name="positive" />}
            >
              <option value="" />
              {this.state.positive_effects !== ""
                ? this.state.positive_effects.map(effect => {
                    return <option value={effect}>{effect}</option>;
                  })
                : ""}
            </Select>
          </FormControl>
          <Button
            type="submit"
            variant="raised"
            color="primary"
            className={this.props.classes.button}
          >
            Search
          </Button>
        </form>
      </div>
    );
  }
}
export default withStyles(styles)(Filters);
