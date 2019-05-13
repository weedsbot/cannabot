import React from 'react';
import {Redirect, withRouter, Link}  from 'react-router-dom';
import AuthService from "../services/AuthService";
import Strains from '../services/Strains';
import StrainDetails from './StrainDetails';


class StrainLittle extends React.Component {
  constructor(props) {
    super(props)
    this.service = new AuthService();
    this.strainservice = new Strains();
    this.state={
      idStrain:props._id,
      description:props.description,
      flavors:props.flavors,
      medical_effects:props.medical_effects,
      name:props.name,
      negative_effects:props.negative_effects,
      positive_effects:props.positive_effects,
      race:props.race
    }
    this.fetchUser();
  }

  getUser = userObj => {
    this.setState({
      loggedInUser: userObj
    });
  };

  fetchUser() {
    if (this.state.loggedInUser === null) {
      return this.service
        .loggedin()
        .then(response => {
          this.setState({
            loggedInUser: response
          });
        })
        .catch(err => {
          this.setState({
            loggedInUser: null
          });
        });
    }
  }

  handleFavoriteSubmit = event => {
    event.preventDefault();
    const username = this.state.username;

  };


  render(){
    return(
        <React.Fragment>
          <p>{this.state.name}</p>
          <p>{this.state.race}</p>
          <Link to={`/straindetail/${this.state.idStrain}`}> Details </Link>
        </React.Fragment>
    )
  }

}


export default StrainLittle;