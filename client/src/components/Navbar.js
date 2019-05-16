import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Avatar from "@material-ui/core/Avatar";

import Image from "../img/icon-user-default.png";

const styles = {
  root: {
    flexGrow: 1,
    height: "10vh"
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
    color: "inherit"
  },
  navBg: {
    background: "rgba(255, 255, 255, 0.7)"
  },
  bigAvatar: {
    margin: 10,
    width: 40,
    height: 40
  },
  profileDiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20
  }
};

class Navbar extends React.Component {
  handlerLogout = e => {
    e.preventDefault();
    this.props.logoutHandler();
  };

  render() {
    if (this.props.user) {
      return (
        <div className={this.props.classes.root}>
          <AppBar positionSticky className={this.props.classes.navBg}>
            <Toolbar className={this.props.classes.root}>
              {/* <IconButton
                className={this.props.classes.menuButton}
                aria-label="Menu"
              >
                <MenuIcon />
              </IconButton> */}
              <Typography variant="h6" className={this.props.classes.grow}>
                <NavLink className={this.props.classes.noDecoration} to="/">
                  Home
                </NavLink>
              </Typography>
              <Typography variant="h6" className={this.props.classes.grow}>
                <NavLink
                  className={this.props.classes.noDecoration}
                  to="/searchstrains"
                >
                  Search
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
              <div className={this.props.classes.profileDiv}>
                <NavLink
                  className={this.props.classes.noDecoration}
                  to="/profile"
                >
                  <Avatar
                    alt={this.props.user}
                    src={
                      this.props.user.image_url === ""
                        ? Image
                        : this.props.user.image_url
                    }
                    className={this.props.classes.bigAvatar}
                  />
                </NavLink>
                <Typography
                  variant="headline"
                  color="textPrimary"
                  // className={this.props.classes.grow}
                >
                  {this.props.user.username}
                </Typography>
              </div>

              <Button color="default">
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
          <AppBar className={this.props.classes.navBg}>
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
                  to="/searchstrains"
                >
                  Search
                </NavLink>
              </Typography>
              <Button className={this.props.classes.buttonMargin}>
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
