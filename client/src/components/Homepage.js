import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Landing from './Landing';
import WeedsGrid from './WeedsGrid';

const styles = {}

class Homepage extends Component {
  render() {
    return (
      <React.Fragment>
        <Landing />
        <WeedsGrid />
      </React.Fragment>
    );
  }
}
export default withStyles(styles)(Homepage);
