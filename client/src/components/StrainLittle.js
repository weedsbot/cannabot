import React from "react";
import { Redirect, withRouter, Link } from "react-router-dom";
import AuthService from "../services/AuthService";
import Strains from "../services/Strains";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";

import Image from "../img/lemonpot_edit.jpg"; // Import using relative path

const styles = {
  card: {
    width: 300,
    height: 298,
    margin: 15
  },
  media: {
    height: 140
  },
  upperCase: {
    textTransform: `uppercase`
  },
  noDecoration: {
    textDecoration: "none",
    color: "blue"
  },
  separateActions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  buttonsMargin: {
    padding: 5
  }
};

class StrainLittle extends React.Component {
  constructor(props) {
    super(props);
    this.service = new AuthService();
    this.strainservice = new Strains();

    this.state = {
      idStrain: props._id,
      description: props.description,
      flavors: props.flavors,
      medical_effects: props.medical_effects,
      name: props.name,
      negative_effects: props.negative_effects,
      positive_effects: props.positive_effects,
      race: props.race
    };
    this.fetchUser();
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

  handleFavoriteSubmit = event => {
    event.preventDefault();
    const username = this.state.username;
  };

  render() {
    return (
      <Card className={this.props.classes.card}>
        <CardActionArea>
          <CardMedia
            className={this.props.classes.media}
            image={Image}
            title=""
          />
          <CardContent>
            <Typography variant="h5" component="h2">
              {this.state.name}
            </Typography>
            <Typography
              className={this.props.classes.upperCase}
              variant="subtitle1"
              color="textSecondary"
            >
              {this.state.race}
            </Typography>
            <Typography component="p" noWrap="true">
              {this.state.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={this.props.classes.separateActions}>
          <Button
            className={this.props.classes.buttonsMargin}
            size="small"
            color="primary"
          >
            <Link
              className={this.props.classes.noDecoration}
              to={`/straindetail/${this.state.idStrain}`}
            >
              {" "}
              More details
            </Link>
          </Button>
          <IconButton
            className={this.props.classes.buttonsMargin}
            aria-label="Add to favorites"
          >
            <FavoriteIcon color="inherit" />
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(StrainLittle);
