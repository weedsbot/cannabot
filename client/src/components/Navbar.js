import React from 'react';
import {NavLink, withRouter}  from 'react-router-dom';
import AuthService from "../services/AuthService";


class Navbar extends React.Component {
    constructor(props) {
        super(props)
        this.service = new AuthService();
    }

    getUser = (userObj) => {
        this.setState({
            loggedInUser: userObj
        })
    }

    fetchUser() {
        if (this.state.loggedInUser === null) {
            return this.service.loggedin()
              .then(response => {
                  this.setState({
                      loggedInUser: response
                  })
              })
              .catch(err => {
                  this.setState({
                      loggedInUser: null
                  })
              })
        }
    }

  handlerLogout = (e)=>{
    e.preventDefault()
    this.props.logoutHandler()
    this.props.history.push('/')
  }

    render() {
        if (this.props.loggedInUser) {
            return(
              <nav className="navbar navbar-inverse" >
                  <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                      <ul className="nav navbar-nav navbar-right">
                          <NavLink to="/" >Home</NavLink>
                          <NavLink to="/profile">Profile</NavLink>
                          <NavLink to="/userweeds" >Mis hierbas</NavLink>
                          <a href="#" onClick={(e) => this.handlerLogout(e)}>Logout</a>
                      </ul>
                  </div>
              </nav>
            );
        }else{
            return(
              <nav className="navbar navbar-inverse" >
                  <ul className="nav navbar-nav navbar-right">
                      <NavLink to="/" >Home</NavLink>
                      <NavLink to="/login">Login</NavLink>
                  </ul>
              </nav>
            );
        }
    }
};

export default withRouter(Navbar);