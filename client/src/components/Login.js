import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/AuthService";
import { Redirect } from "react-router-dom";
import Signup from "./Signup";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

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
        this.setState({
          username: response.username,
          password: response.password,
          error: false
        });

        this.props.getUser(response);
      })
      .catch(error => {
        this.setState({
          error: true
        });
      });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className={this.props.classes.container}>
        <div className={this.props.classes.formDiv}>
          <Typography variant="h5">Please, login to our site</Typography>
          <form
            onSubmit={this.handleFormSubmit}
            className={this.props.classes.container}
            noValidate
            autoComplete="off"
          >
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
            />
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
            />

            <Button
              variant="outlined"
              color="inherit"
              className={this.props.classes.button}
              type="submit"
              value="Login"
            >
              Login
            </Button>
          </form>

          <Typography variant="h5">
            {this.state.error ? <Redirect to="/signup" /> : ""}
          </Typography>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Login);
