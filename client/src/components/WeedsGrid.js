import React, { Component } from 'react';
import Strains from '../services/Strains';
import StrainLittle from './StrainLittle';
import { withStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography'
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";

import Image from "../img/bg.jpg"; // Import using relative path

const styles = {
  container: {
    background: `url(${Image}) no-repeat center center fixed`,
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'red'
  }
};


class WeedsGrid extends Component {
  constructor(props) {
    super(props);
    this.strainservice = new Strains();
    this.state = {
        strains: []
        };

    this.getStrains()
  }

  getStrains(){
    return this.strainservice.allStrains().then(payload=>{
      this.setState({
        ...this.state,
        strains: payload
      })
    })
  }


  render() {
    return(
    <div>
        <h2>Weeds Catalog</h2>
        {
          this.state.strains.map((strain, idx) => {
              return (
                <div key={strain._id}>
                    <StrainLittle {...strain}/>
                </div>
              )
          })
        }
    </div>
    )
    }

}
export default withStyles(styles)(WeedsGrid);

