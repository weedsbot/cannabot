import React, { Component } from "react";
import Strains from "../services/Strains";
import StrainLittle from "./StrainLittle";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Pagination from "./Pagination";
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";

const styles = {
  container: {
    height: "90vh",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap"
  }
};

class WeedsGrid extends Component {
  constructor(props) {
    super(props);
    this.strainservice = new Strains();
    this.state = {
      strains: [],
      pageOfItems: []
    };

    this.getStrains();
    this.onChangePage = this.onChangePage.bind(this);
  }
  getStrains() {
    return this.strainservice.allStrains().then(payload => {
      this.setState({
        ...this.state,
        strains: payload
      });
    });
  }

  onChangePage(pageOfItems) {
    this.setState({ pageOfItems: pageOfItems });
  }

  render() {
    return (
      <React.Fragment>
        <h2>Weeds catalog</h2>
        <div className={this.props.classes.container}>
          {this.state.strains.map((strain, idx) => {
            return (
              <div key={strain._id}>
                <StrainLittle {...strain} />
              </div>
            );
          })}
        </div>
        {/* <Pagination
          items={this.state.strains}
          onChangePage={this.onChangePage}
        /> */}
      </React.Fragment>
    );
  }
}
export default withStyles(styles)(WeedsGrid);
