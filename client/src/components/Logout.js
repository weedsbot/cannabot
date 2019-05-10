import React from 'react';
import {Redirect}  from 'react-router-dom';
import AuthService from "../services/AuthService";


class Logout extends React.Component {
  constructor() {
    super()
    this.state = {
      loggedInUser: null ,
      timePassed : false
    };
    this.service = new AuthService();

  }

  componentWillMount() {
    setTimeout(() => {
      this.setState({ timePassed: true });
    }, 3000);
  }

  render() {
    if(this.state.timePassed){
      return (
        this.service.logout()
          .then(()=>{
            return <Redirect to='/' />
          })
          .catch(()=>{
            return <Redirect to='/' />
          })
      )
    }else{
      return (<div> Div else</div>)
    }
  }



};

export default Logout;