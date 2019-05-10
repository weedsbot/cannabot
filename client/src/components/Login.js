import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../services/AuthService'
import { Redirect } from 'react-router-dom';
import Signup from './Signup';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
    this.service = new AuthService();
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    this.service.login(username, password)
      .then(response => {
        this.props.getUser(response);
        this.setState({
          username: response.username,
          password: response.password,
          redirectToHome :true,
          error: false
        });


        this.props.history.push('/')
      })
      .catch(error => {
        this.setState({
          error: true
        });
      })
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }


  render() {
    const redirectToHome = this.state.redirectToHome;
    if (redirectToHome === true) {
      return <Redirect to="/" />
    }
    return (<div>
      <h3>Please, login to our site</h3>

      <form onSubmit={this.handleFormSubmit}>
        <fieldset>
          <label>Username:</label>
          <input type="text" name="username" value={this.state.username} onChange={e => this.handleChange(e)} />
        </fieldset>

        <fieldset>
          <label>Password:</label>
          <input type="password" name="password" value={this.state.password} onChange={e => this.handleChange(e)} />
        </fieldset>

        <input type="submit" value="Login" />
      </form>

      <h1>{this.state.error ? <Redirect to='/signup'/> : ''}</h1>
    </div>)

  }


}


export default Login;