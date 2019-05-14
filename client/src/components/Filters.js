import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { fade } from "@material-ui/core/styles/colorManipulator";
import Input from "@material-ui/core/Input";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";

const styles = theme => ({
  container: {
    display: "flex",
    backgroundColor: "rgba(100,100,100,0.2)",
    heigth: "20vh",
    marginTop: "10vh",
    justifyContent: "space-around",
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
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: "100%",
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
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: 20,
    minWidth: 200
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

class Filters extends Component {
  state = {
    age: "",
    name: "hai",
    labelWidth: 0
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  render() {
    return (
      <div className={this.props.classes.container}>
        <div className={this.props.classes.search}>
          <div className={this.props.classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
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
          <InputLabel
            ref={ref => {
              this.InputLabelRef = ref;
            }}
            htmlFor="outlined-age-native-simple"
          >
            Race
          </InputLabel>
          <Select
            native
            value={this.state.age}
            onChange={this.handleChange("age")}
            input={
              <OutlinedInput
                name="age"
                labelWidth={this.state.labelWidth}
                id="outlined-age-native-simple"
              />
            }
          >
            <option value="" />
            <option value={10}>Ten</option>
            <option value={20}>Twenty</option>
            <option value={30}>Thirty</option>
          </Select>
        </FormControl>
        <FormControl
          variant="outlined"
          className={this.props.classes.formControl}
        >
          <InputLabel
            ref={ref => {
              this.InputLabelRef = ref;
            }}
            htmlFor="outlined-age-native-simple"
          >
            Medical effects
          </InputLabel>
          <Select
            native
            value={this.state.age}
            onChange={this.handleChange("age")}
            input={
              <OutlinedInput
                name="age"
                labelWidth={this.state.labelWidth}
                id="outlined-age-native-simple"
              />
            }
          >
            <option value="" />
            <option value={10}>Ten</option>
            <option value={20}>Twenty</option>
            <option value={30}>Thirty</option>
          </Select>
        </FormControl>
        <FormControl
          variant="outlined"
          className={this.props.classes.formControl}
        >
          <InputLabel
            ref={ref => {
              this.InputLabelRef = ref;
            }}
            htmlFor="outlined-age-native-simple"
          >
            Positive effects
          </InputLabel>
          <Select
            native
            value={this.state.age}
            onChange={this.handleChange("age")}
            input={
              <OutlinedInput
                name="age"
                labelWidth={this.state.labelWidth}
                id="outlined-age-native-simple"
              />
            }
          >
            <option value="" />
            <option value={10}>Ten</option>
            <option value={20}>Twenty</option>
            <option value={30}>Thirty</option>
          </Select>
        </FormControl>
        <FormControl
          variant="outlined"
          className={this.props.classes.formControl}
        >
          <InputLabel
            ref={ref => {
              this.InputLabelRef = ref;
            }}
            htmlFor="outlined-age-native-simple"
          >
            Negative effects
          </InputLabel>
          <Select
            native
            value={this.state.age}
            onChange={this.handleChange("age")}
            input={
              <OutlinedInput
                name="age"
                labelWidth={this.state.labelWidth}
                id="outlined-age-native-simple"
              />
            }
          >
            <option value="" />
            <option value={10}>Ten</option>
            <option value={20}>Twenty</option>
            <option value={30}>Thirty</option>
          </Select>
        </FormControl>
      </div>
    );
  }
}
export default withStyles(styles)(Filters);
