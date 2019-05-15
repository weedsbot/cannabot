import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Filters from "./Filters";
import WeedsGrid from "./WeedsGrid";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    heigth: "90vh"
  }
};

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredStrains: []
    };
  }

  setFilteredStrains = filteredStrains => {
    this.setState({
      ...this.state,
      filteredStrains: filteredStrains
    });
  };

  render() {
    return (
      <div className={this.props.classes.container}>
        <Filters
          setFilteredStrains={filteredStrains =>
            this.setFilteredStrains(filteredStrains)
          }
        />
        <WeedsGrid filteredStrains={this.state.filteredStrains} />
      </div>
    );
  }
}
export default withStyles(styles)(Search);
