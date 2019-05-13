import React from 'react';
import logo from './logo.svg';
import './App.css';
import AuthService from './services/AuthService';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import Navbar from './components/Navbar';
import WeedsGrid from './components/WeedsGrid';
import StrainDetails from './components/StrainDetails';
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/core/styles";

import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";

import Image from "./img/bg.jpg"; // Import using relative path

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }

  getUser = userObj => {
    this.setState({
      loggedInUser: userObj
    });
  };

  logout = () => {
    this.service.logout().then(() => {
      this.setState({ loggedInUser: null });
    });
  };

  fetchUser() {
    if (this.state.loggedInUser === null) {
      return this.service
        .loggedin()
        .then(response => {
          console.log("App fetch user", response);
          this.setState({
            loggedInUser: response
          });
        })
        .catch(err => {
          this.setState({
            loggedInUser: false
          });
        });
    }
  }

  logoutHandler() {
    this.service.logout().then(logoutInfo => {
      this.setState({
        ...this.state,
        loggedInUser: null
      });
    });
  }

  render() {
    this.fetchUser();
    return (
      <BrowserRouter>
        <CssBaseline>
          <div className="App">
            <Navbar
              loggedInUser={this.state.loggedInUser}
              logoutHandler={() => this.logoutHandler()}
            />
            <div>
              <Switch>
                <Route 
                  exact path='/profile' 
                  render={() => <Profile getUser={this.getUser} logoutHandler={()=>this.logoutHandler()}/>} 
                />
                <Route
                  exact
                  path="/signup"
                  render={() => <Signup getUser={this.getUser} />}
                />
                <Route
                  exact
                  path="/login"
                  render={() => <Login getUser={this.getUser} />}
                />
                <Route 
                  exact path='/straindetail/:idStrain' 
                  render={(props) => <StrainDetails {...props} getUser={this.getUser} />} 
                />
                 <Route                 
                  exact
                  path="/"
                  render={() => <WeedsGrid loggedInUser={this.state.loggedInUser} />}
                />
              </Switch>
            </div>
          </div>
        </CssBaseline>
      </BrowserRouter>
    );
  }
}

export default App;
