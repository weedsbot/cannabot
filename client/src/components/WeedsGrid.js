import React, { Component } from "react";
import Strains from "../services/Strains";
import AuthService from "../services/AuthService";
import StrainLittle from "./StrainLittle";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";
import CssBaseline from "@material-ui/core/CssBaseline";

const theme = createMuiTheme();

const styles = {
  main: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    marginTop: "1vh",
    height: "80vh",
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap"
  },
  paginator: {
    marginTop: "30px"
  }
};

class WeedsGrid extends Component {
  constructor(props) {
    super(props);
    this.strainservice = new Strains();
    this.service = new AuthService();
    this.state = {
      strains: [],
      offset: 0
    };

    this.componentDidMount();
  }

  componentDidMount() {
    if (this.props.user) {
      return this.service.getUserById(this.props.user._id).then(user => {
        this.setState({
          ...this.state,
          strains: user.strains
        });
      });
    } else {
      return this.strainservice.allStrains(this.state.offset).then(payload => {
        this.setState({
          ...this.state,
          strains: payload
        });
      });
    }
  }

  handleClick(offset) {
    return this.strainservice.allStrains(offset).then(payload => {
      this.setState({
        ...this.state,
        strains: payload,
        offset
      });
    });
  }

  render() {
    return (
      <div className={this.props.classes.main}>
        {this.props.user ? (
          <div style={{height: '80px'}}></div>
        ) : (
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Pagination
              size="large"
              className={this.props.classes.paginator}
              limit={8}
              offset={this.state.offset}
              total={1970}
              onClick={(e, offset) => this.handleClick(offset)}
            />
          </MuiThemeProvider>
        )}

        <div className={this.props.classes.container}>
          {this.state.strains.map((strain, idx) => {
            return (
              <div key={strain._id}>
                <StrainLittle {...strain} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(WeedsGrid);
