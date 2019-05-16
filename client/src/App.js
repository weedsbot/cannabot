import React from "react";
import "./App.css";
import AuthService from "./services/AuthService";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import StrainDetails from "./components/StrainDetails";
import Chatbot from "./components/chatbot/Chatbot";
import CssBaseline from "@material-ui/core/CssBaseline";
import WeedsGrid from "./components/WeedsGrid";
import Search from "./components/Search";

import { Switch, Route, BrowserRouter } from "react-router-dom";

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
    console.log(this.state.loggedInUser);
    return (
      <BrowserRouter>
        <CssBaseline>
          <div className="App">
            <Navbar
              user={this.state.loggedInUser}
              logoutHandler={() => this.logoutHandler()}
            />
            <div>
              <Switch>
                <Route
                  exact
                  path="/profile"
                  render={props => (
                    <Profile
                      {...props}
                      user={this.state.loggedInUser}
                      getUser={this.getUser}
                    />
                  )}
                />
                <Route exact path="/signup" render={() => <Signup />} />
                <Route
                  exact
                  path="/login"
                  render={() => <Login getUser={this.getUser} />}
                />
                <Route
                  exact
                  path="/straindetail/:idStrain"
                  render={props => (
                    <StrainDetails
                      {...props}
                      user={this.state.loggedInUser}
                      getUser={this.getUser}
                    />
                  )}
                />
                <Route
                  exact
                  path="/"
                  render={props => (
                    <Homepage
                      {...props}
                      user={this.state.loggedInUser}
                      getUser={this.getUser}
                    />
                  )}
                />
                <Route
                  exact
                  path="/userweeds"
                  render={props => (
                    <WeedsGrid
                      {...props}
                      user={this.state.loggedInUser}
                      strains={this.state.loggedInUser.strains}
                      getUser={this.props.getUser}
                    />
                  )}
                />
                <Route
                  exact
                  path="/searchstrains"
                  render={props => (
                    <Search
                      user={this.state.loggedInUser}
                      getUser={this.getUser}
                    />
                  )}
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
