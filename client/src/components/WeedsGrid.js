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
    marginTop: "70px"
  }
};

class WeedsGrid extends Component {
  constructor(props) {
    super(props);
    this.strainservice = new Strains();
    this.service = new AuthService();
    this.state = {
      allStrains: [],
      strains: [],
      offset: 0,
      allStrainsNumber: 0
    };
  }

  // componentDidMount() {
  //   this.setState({
  //     ...this.state,
  //     allStrains: this.props.user.strains,
  //     strains: this.props.user.strains.slice(
  //       this.state.offset,
  //       this.state.offset + 10
  //     ),
  //     allStrainsNumber: this.props.user.strains.length
  //   });
  // }

  componentWillReceiveProps(nextProps) {
    if (this.props.strains !== nextProps.strains) {
      console.log(nextProps.strains);
      this.setState({
        ...this.state,
        allStrains: nextProps.strains,
        strains: nextProps.strains.slice(
          this.state.offset,
          this.state.offset + 10
        ),
        allStrainsNumber: nextProps.strains.length
      });
    }
  }
  handleClick(offset) {
    this.setState({
      ...this.state,
      strains: this.state.allStrains.slice(offset, offset + 10),
      offset
    });
  }

  render() {
    console.log(this.props.user);
    console.log(this.state);
    return (
      <div className={this.props.classes.main}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Pagination
            size="large"
            className={this.props.classes.paginator}
            limit={10}
            offset={this.state.offset}
            total={this.state.allStrainsNumber}
            onClick={(e, offset) => this.handleClick(offset)}
          />
        </MuiThemeProvider>

        <div className={this.props.classes.container}>
          {this.state.strains.map(strain => {
            return (
              <div key={strain._id}>
                <StrainLittle
                  {...strain}
                  user={this.props.user}
                  getUser={this.props.getUser}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(WeedsGrid);
