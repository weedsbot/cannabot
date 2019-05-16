import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Landing from "./Landing";
import WeedsGrid from "./WeedsGrid";
import StrainsService from "../services/Strains";
import Typography from "@material-ui/core/Typography";

import Search from '../img/search.png'
import Fav from '../img/fav.png'
import Medical from '../img/medical.png'

const styles = {
  itemsContainer: {
    marginTop: "7vh",
    marginBottom: "7vh",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  item: {
    width: "300px",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemImage:{
    width: '50%',
    marginBottom: '3vh'
  },
  boldSpan: {
    fontWeight: "bolder"
    // color: "white"
  }
};

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.strainservice = new StrainsService();
    this.state = {
      strains: []
    };
    this.getStrains();
  }

  getStrains = () => {
    return this.strainservice.allStrains().then(payload => {
      this.setState({
        ...this.state,
        strains: payload
      });
    });
  };

  render() {
    return (
      <React.Fragment>
        <Landing />
        <div className={this.props.classes.itemsContainer}>
          <div className={this.props.classes.item}>
            <img alt="Search" src={Search} className={this.props.classes.itemImage} />
            <Typography
              align="center"
              variant="h4"
              color="inherit"
              // className={this.props.classes.white}
            >
              <span className={this.props.classes.boldSpan}>Choose</span> <br />
              from over 1900
              <br />
              strains varieties
            </Typography>
          </div>
          <div className={this.props.classes.item}>
            <img alt="Medical" src={Medical} className={this.props.classes.itemImage} />
            <Typography
              align="center"
              variant="h4"
              color="inherit"
              // className={this.props.classes.white}
            >
              <span className={this.props.classes.boldSpan}>Help</span> <br />
              mitigate your
              <br />
              medical problems
            </Typography>
          </div>
          <div className={this.props.classes.item}>
            <img alt="Fav" src={Fav} className={this.props.classes.itemImage} />
            <Typography
              align="center"
              variant="h4"
              color="inherit"
              // className={this.props.classes.white}
            >
              <span className={this.props.classes.boldSpan}>Add</span> <br />
              strains and check
              <br />
              them out anytime
            </Typography>
          </div>
        </div>
        <WeedsGrid
          user={this.props.user}
          strains={this.state.strains}
          getUser={this.props.getUser}
        />
      </React.Fragment>
    );
  }
}
export default withStyles(styles)(Homepage);
