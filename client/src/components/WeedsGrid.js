import React, { Component } from "react";
import Strains from "../services/Strains";
import AuthService from '../services/AuthService';
import StrainLittle from "./StrainLittle";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Pagination from "./Pagination";
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";

const styles = {
  container: {
    marginTop: '10vh',
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
    this.service = new AuthService();
    this.state = {
      strains: [],
      pageOfItems: []
    };

    this.componentDidMount();
    this.onChangePage = this.onChangePage.bind(this);
  }


  componentDidMount(){
    if (this.props.user) {
      return this.service.getUserById(this.props.user._id).then(user => {
        this.setState({
          ...this.state,
          strains: user.strains
        });
      });
    } else {
      return this.strainservice.allStrains().then(payload => {
        this.setState({
          ...this.state,
          strains: payload
        });
      });
    }
  }

  onChangePage(pageOfItems) {
    this.setState({ pageOfItems: pageOfItems });
  }

  render() {
    return (
      <React.Fragment>
        <div className={this.props.classes.container}>
          {this.state.strains.slice(0, 20).map((strain, idx) => {
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
