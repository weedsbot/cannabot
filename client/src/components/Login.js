import React, { Component } from "react";
import AuthService from "../services/AuthService";
import { Redirect , NavLink} from "react-router-dom";
import Signup from "./Signup";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh",
    flexDirection: "column"
  },
  formDiv: {
    display: "flex",
    flexDirection: "column",
    background: "rgba(100,100,100,0.3)",
    width: "30vw",
    height: "50vh",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  },
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  },

  main: {
    width: "auto",
    display: "block",
    marginTop: 100,
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  singupText: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: "15px"
  }
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
    this.service = new AuthService();
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    this.service
      .login(username, password)
      .then(response => {
        this.props.getUser(response);
        this.setState({
          username: response.username,
          password: response.password,
          redirectToHome: true,
          error: false
        });

        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({
          error: error
        });
      });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const redirectToHome = this.state.redirectToHome;
    if (redirectToHome === true) {
      return <Redirect to="/" />;
    }

    return (
      <main className={this.props.classes.main}>
        <CssBaseline />
        <Paper className={this.props.classes.paper}>
          <Avatar className={this.props.classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <form
            className={this.props.classes.form}
            onSubmit={this.handleFormSubmit}
            autoComplete="off"
          >
            <FormControl margin="normal" required fullWidth>
              <TextField
                id="outlined-name"
                label="Name"
                className={this.props.classes.textField}
                margin="normal"
                variant="outlined"
                type="text"
                name="username"
                value={this.state.username}
                onChange={e => this.handleChange(e)}
                required
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <TextField
                id="outlined-password-input"
                label="Password"
                className={this.props.classes.textField}
                type="password"
                autoComplete="current-password"
                margin="normal"
                variant="outlined"
                name="password"
                value={this.state.password}
                onChange={e => this.handleChange(e)}
                required
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={this.props.classes.submit}
              value="Sign up"
            >
              Log in
            </Button>
          </form>
          <div className={this.props.classes.singupText}>
            <Typography variant="p">Don't have an account yet!? </Typography>
            <NavLink className={this.props.classes.noDecoration} to="/signup">
              Sign up
            </NavLink>
          </div>
          <Typography variant="h5">
            {this.state.error ? 'Error' : ""}
          </Typography>{" "}  
        </Paper>
      </main>
    );
  }
}

export default withStyles(styles)(Login);
