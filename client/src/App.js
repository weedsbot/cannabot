import React from 'react';
import logo from './logo.svg';
import './App.css';
import AuthService from './services/AuthService';
import Signup from './components/Signup';
import Login from './components/Login';
import Logout from './components/Logout';
import Profile from './components/Profile';
import Navbar from './components/Navbar';
import WeedsGrid from './components/WeedsGrid';

import { Switch, Route, Redirect, BrowserRouter} from 'react-router-dom';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }

  getUser = (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }

  logout = () => {
    this.service.logout()
      .then(() => {
        this.setState({ loggedInUser: null });
      })
  }

  fetchUser() {
    if (this.state.loggedInUser === null) {
      return this.service.loggedin()
        .then(response => {
          console.log("App fetch user", response)
          this.setState({
            loggedInUser: response
          })
        })
        .catch(err => {
          this.setState({
            loggedInUser: false
          })
        })
    }
  }


  render(){
    this.fetchUser();
    return(
      <BrowserRouter>
        <div className="App">
          <Navbar loggedInUser={this.state.loggedInUser}></Navbar>
          <Switch>
            <Route exact path='/profile' render={() => <Profile getUser={this.getUser} />} />
            <Route exact path='/signup' render={() => <Signup getUser={this.getUser} />} />
            <Route exact path='/login' render={() => <Login getUser={this.getUser} />} />
            <Route exact path='/logout' render={() => <Logout getUser={this.getUser} />} />
            <Route exact path='/' render={() => <WeedsGrid getUser={this.getUser} />} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }

}

export default App;
