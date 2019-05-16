import React, { Component } from "react";
import AuthService from "../services/AuthService";
import { Redirect } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import Image from "../img/snoop.jpg";

const styles = theme => ({
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
    width: "70vw",
    display: "block",
    // marginTop: 60,
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: "100vw",
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    // marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    background: "rgba(100, 100, 100, 0.15)",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    display:'flex',
    justifyContent:'space-around',
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  media: {
    height: "60vh",
    maxWidth: "50vw",
    padding: "3vh"
  },
  textInfo: {
    width: "50vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  race: {
    textTransform: "uppercase"
  },
  propertiesContainer: {
    width: "50vw",
    display: "flex",
    flexWrap: "wrap"
  },
  properties: {
    width: "25%"
  },
  icon: {
    display: "flex",
    justifyContent: "center"
  }
});

class Profile extends Component {
  constructor(props) {
    super(props);
    this.service = new AuthService();
    this.state = {
      username: "",
      image_url: ""
    };
  }

  handleImageSubmit = event => {
    event.preventDefault();

    this.service
      .uploadPicture(this.state)
      .then(response => {
        this.props.getUser(response.userUpdated)
      })
      .catch(() => {
        return <Redirect to="/" />;
      });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleChangeFile = event => {
    const { name, files } = event.target;
    this.setState({ [name]: files });
  };

  render() {
    if (!this.props.user) return <Redirect to='/'/>

    return (
      <main className={this.props.classes.main}>
        <CssBaseline />
        <Paper className={this.props.classes.paper}>
          {this.props.user !== null && (
            <React.Fragment>
              <div>
                <img
                  className={this.props.classes.media}
                  src={
                    this.props.user.image_url === ''
                      ? Image
                      : this.props.user.image_url
                  }
                  title={this.props.user.username}
                  alt="#"
                />
                <form
                  onSubmit={e => this.handleImageSubmit(e)}
                  className={this.props.classes.form}
                >
                  <input
                    accept="image/*"
                    className={this.props.classes.input}
                    id="contained-button-file"
                    type="file"
                    name="image"
                    onChange={e => this.handleChangeFile(e)}
                  />
                  <label htmlFor="contained-button-file">
                    <Button
                      variant="contained"
                      component="span"
                      className={this.props.classes.button}
                    >
                      Select Picture
                    </Button>
                  </label>
                  <Button
                    variant="contained"
                    type="submit"
                    className={this.props.classes.button}
                  >
                    Upload
                  </Button>
                </form>
              </div>
              <div className={this.props.classes.textInfo}>
                <div>
                  <Typography component="h2" variant="h3">
                    {this.props.user.username}
                  </Typography>
                  <Typography
                    className={this.props.classes.race}
                    component="p"
                    variant="h6"
                    color="textSecondary"
                  >
                    Lorem
                  </Typography>
                  <Typography component="p" paragraph>
                    Stract
                  </Typography>
                </div>
                <div className={this.props.classes.propertiesContainer} />
              </div>
            </React.Fragment>
          )}
        </Paper>
      </main>
    );
  }
}

export default withStyles(styles)(Profile);
