import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import Image from "../img/bg.jpg"; // Import using relative path

const styles = {
  container: {
    background: `url(${Image}) no-repeat center center`,
    height: "75vh",
    backgroundSize: "cover",
    display: "flex",
    justifyContent: "left",
    alignItems: "up",
    // marginTop:'10vh'
  },
  rectangle: {
    // background: "rgba(100,100,100,0.2)",
    height: "30vh",
    width: "100vw",
    display: "flex",
    justifyContent: "left",
    alignItems: "center",
    color: "white",
    marginTop: 80
  },
  boldSpan: {
    fontWeight: "bolder",
    color: 'white',
  },
  white:{
    color: 'white',
    marginLeft: '5vw'
  }
};

class Landing extends Component {
  render() {
    return (
      <div className={this.props.classes.container}>
        <div className={this.props.classes.rectangle}>
          <Typography variant="h1" className={this.props.classes.white}>
            {" "}
            <span className={this.props.classes.boldSpan}>Find</span> <br />the
            strain <br />
            that suits you
          </Typography>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(Landing);
