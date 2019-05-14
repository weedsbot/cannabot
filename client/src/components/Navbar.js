import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import AuthService from "../services/AuthService";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  noDecoration: {
    textDecoration: "none",
    color: "black"
  },
  navBg: {
    background: 'rgba(255, 255, 255, 0.7)'
  }
};

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.service = new AuthService();
  }

  getUser = userObj => {
    this.setState({
      loggedInUser: userObj
    });
  };

  fetchUser() {
    if (this.state.loggedInUser === null) {
      return this.service
        .loggedin()
        .then(response => {
          this.setState({
            loggedInUser: response
          });
        })
        .catch(err => {
          this.setState({
            loggedInUser: null
          });
        });
    }
  }

  handlerLogout = e => {
    e.preventDefault();
    this.props.logoutHandler();
    this.props.history.push("/");
  };

  render() {
    if (this.props.loggedInUser) {
      return (
        <div className={this.props.classes.root}>
          <AppBar positionSticky className={this.props.classes.navBg}>
            <Toolbar className={this.props.classes.root}>
              <IconButton
                className={this.props.classes.menuButton}
                aria-label="Menu"
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={this.props.classes.grow}>
                <NavLink className={this.props.classes.noDecoration} to="/">
                  Home
                </NavLink>
              </Typography>
              <Typography variant="h6" className={this.props.classes.grow}>
                <NavLink
                  className={this.props.classes.noDecoration}
                  to="/profile"
                >
                  Profile
                </NavLink>
              </Typography>
              <Typography variant="h6" className={this.props.classes.grow}>
                <NavLink
                  className={this.props.classes.noDecoration}
                  to="/userweeds"
                >
                  My Strains
                </NavLink>
              </Typography>

              <Button color="black">
                {" "}
                <a
                  href="#"
                  className={this.props.classes.noDecoration}
                  onClick={e => this.handlerLogout(e)}
                >
                  Logout
                </a>
              </Button>
            </Toolbar>
          </AppBar>
        </div>
      );
    } else {
      return (
        <div className={this.props.classes.root}>
          <AppBar positionSticky className={this.props.classes.navBg}>
            <Toolbar className={this.props.classes.root}>
              <IconButton
                className={this.props.classes.menuButton}
                aria-label="Menu"
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={this.props.classes.grow}>
                <NavLink className={this.props.classes.noDecoration} to="/">
                  Home
                </NavLink>
              </Typography>

              <Button>
                <NavLink
                  className={this.props.classes.noDecoration}
                  to="/login"
                >
                  Login
                </NavLink>
              </Button>
            </Toolbar>
          </AppBar>
        </div>
      );
    }
  }
}

export default withStyles(styles)(withRouter(Navbar));
