import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Landing from "./Landing";
import WeedsGrid from "./WeedsGrid";
import StrainsService from "../services/Strains";

const styles = {};

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.strainservice = new StrainsService();
    this.state = {
      strains: []
    }
    this.getStrains()
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
        <WeedsGrid user={this.props.user} strains={this.state.strains} getUser={this.props.getUser}/>
      </React.Fragment>
    );
  }
}
export default withStyles(styles)(Homepage);
