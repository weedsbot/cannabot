import React from "react";
import { Redirect, withRouter } from "react-router-dom";
import AuthService from "../services/AuthService";
import Strains from "../services/Strains";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";

import Image from "../img/lemonpot_edit.jpg";

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
    marginTop: 60,
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: "100vw",
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  media: {
    height: "60vh",
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

class StrainDetails extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.match.params.idStrain);
    this.service = new AuthService();
    this.strainservice = new Strains();
    this.state = {
      idStrain: this.props.match.params.idStrain,
      strainDetails: {}
    };
    this.getStrainDetails(this.state.idStrain);
  }

  getStrainDetails = idStrain => {
    return this.strainservice.findOneStrainById(idStrain).then(payload => {
      this.setState({
        ...this.state,
        strainDetails: payload
      });
    });
  };

  render() {
    return (
      <main className={this.props.classes.main}>
        <CssBaseline />
        <Paper className={this.props.classes.paper}>
          <img
            className={this.props.classes.media}
            src={Image}
            title={this.state.strainDetails.name}
          />
          <div className={this.props.classes.textInfo}>
            <div>
              <Typography component="h2" variant="h3">
                {this.state.strainDetails.name}
              </Typography>
              <Typography
                className={this.props.classes.race}
                component="p"
                variant="h6"
                color="textSecondary"
              >
                {this.state.strainDetails.race}
              </Typography>
              <Typography component="p" paragraph>
                {this.state.strainDetails.description}
              </Typography>
            </div>
            <div className={this.props.classes.propertiesContainer}>
              <List component="ul" className={this.props.classes.properties}>
                <Typography variant="h6">Flavours:</Typography>
                {this.state.strainDetails.flavors !== undefined
                  ? this.state.strainDetails.flavors.map(flavour => {
                      return (
                        <ListItem>
                          <ListItemText primary={flavour} />
                        </ListItem>
                      );
                    })
                  : null}
              </List>
              <List component="ul" className={this.props.classes.properties}>
                <Typography variant="h6">Medical:</Typography>
                {this.state.strainDetails.medical_effects !== undefined
                  ? this.state.strainDetails.medical_effects.map(medical => {
                      return (
                        <ListItem>
                          <ListItemText primary={medical} />
                        </ListItem>
                      );
                    })
                  : null}
              </List>
              <List component="ul" className={this.props.classes.properties}>
                <Typography variant="h6">Negative:</Typography>
                {this.state.strainDetails.negative_effects !== undefined
                  ? this.state.strainDetails.negative_effects.map(effect => {
                      return (
                        <ListItem>
                          <ListItemText primary={effect} />
                        </ListItem>
                      );
                    })
                  : null}
              </List>
              <List component="ul" className={this.props.classes.properties}>
                <Typography variant="h6">Positive:</Typography>

                {this.state.strainDetails.positive_effects !== undefined
                  ? this.state.strainDetails.positive_effects.map(effect => {
                      return (
                        <ListItem>
                          <ListItemText primary={effect} />
                        </ListItem>
                      );
                    })
                  : null}
              </List>
              <div className={this.props.classes.icon}>
                <IconButton aria-label="Add to favorites">
                  <FavoriteIcon color="error" />
                </IconButton>
              </div>
            </div>
          </div>
        </Paper>
      </main>
    );
  }
}

export default withStyles(styles)(StrainDetails);
