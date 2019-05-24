import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Filters from "./Filters";
import WeedsGrid from "./WeedsGrid";
import StrainsService from "../services/Strains";
import Chatbot from "./chatbot/Chatbot";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    heigth: "90vh",
    width: 'auto'
  },
  chat :{
    marginRight: 20,
    zIndex: 'snackbar'
  }
};

class Search extends Component {
  constructor(props) {
    super(props);
    this.strainservice = new StrainsService();
    this.state = {
      filteredStrains: []
    };
    this.getStrains();
  }

  getStrains = () => {
    return this.strainservice.allStrains().then(payload => {
      this.setState({
        ...this.state,
        filteredStrains: payload
      });
    });
  };

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
        <Chatbot
          snackbar
          className={this.props.classes.chat}
          setFilteredStrains={filteredStrains =>
            this.setFilteredStrains(filteredStrains)
          }
        />
        <WeedsGrid
          user={this.props.user}
          strains={this.state.filteredStrains}
          getUser={this.props.getUser}
          // style={{z-index: -1}}
        />
      </div>
    );
  }
}
export default withStyles(styles)(Search);
