import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import Image from "../img/bg.jpg"; // Import using relative path

const styles = {
  container: {
    background: `url(${Image}) no-repeat center center`,
    height: "90vh",
    backgroundSize: "cover",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  rectangle: {
    background: "rgba(100,100,100,0.2)",
    height: "30vh",
    width: "40vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "red"
  }
};

class Landing extends Component {
  render() {
    return (
      <div className={this.props.classes.container}>
        <div className={this.props.classes.rectangle}>
          <Typography variant="h3">Weed</Typography>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(Landing);