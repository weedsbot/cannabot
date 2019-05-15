import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Landing from "./Landing";
import WeedsGrid from "./WeedsGrid";

const styles = {};

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredStrains: []
    };
  }
  render() {
    return (
      <React.Fragment>
        <Landing />
        <WeedsGrid filteredStrains={this.state.filteredStrains} />
      </React.Fragment>
    );
  }
}
export default withStyles(styles)(Homepage);
