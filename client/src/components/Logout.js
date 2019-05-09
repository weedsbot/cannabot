import React from 'react';
import {Redirect}  from 'react-router-dom';
import AuthService from "../services/AuthService";


class Logout extends React.Component {
  constructor() {
    super()
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }

  render() {
    return(
      this.service.logout()
        .then(()=>{
          setTimeout(function(){ return <Redirect to='/' /> }, 3000);

        })
        .catch(()=>{
          return <Redirect to='/' />
        })
    )
  }



};

export default Logout;