import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Filters from './Filters';
import WeedsGrid from './WeedsGrid';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    heigth: '90vh'
  }
}

class Search extends Component {
  render() {
    return (
      <div className={this.props.classes.container}>
        <Filters />
        <WeedsGrid />
      </div>
    );
  }
}
export default withStyles(styles)(Search);