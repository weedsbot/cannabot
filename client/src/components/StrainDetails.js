import React from 'react';
import {Redirect, withRouter}  from 'react-router-dom';
import AuthService from "../services/AuthService";
import Strains from "../services/Strains";

class StrainDetails extends React.Component {
  constructor(props) {
    super(props)
    console.log(this.props.match.params.idStrain)
    this.service = new AuthService();
    this.strainservice = new Strains();
    this.state = {
      idStrain: this.props.match.params.idStrain,
      strainDetails :{}
    }
    this.getStrainDetails(this.state.idStrain);
  }

  getStrainDetails = (idStrain)=>{
    return this.strainservice.findOneStrainById(idStrain).then(payload=>{
      this.setState({
        ...this.state,
        strainDetails: payload
      })
    })
  }


  render(){
    return(
      <div>
        <p>{this.state.strainDetails.name}</p>
        <p>{this.state.strainDetails.description}</p>
        <p>{this.state.strainDetails.flavors}</p>
        <p>{this.state.strainDetails.race}</p>
        <p>{this.state.strainDetails.medical_effects}</p>
        <p>{this.state.strainDetails.positive_effects}</p>
        <p>{this.state.strainDetails.negative_effects}</p>
      </div>
    )
  }


}


export default StrainDetails;