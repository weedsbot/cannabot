import React, { Component } from 'react';
import AuthService from '../services/AuthService';
import { Redirect, Link, BrowserRouter } from 'react-router-dom';

class Profile extends Component {
  constructor(props){
    super(props);
    this.service = new AuthService();
    this.state = {
      loggedInUser: null,
      username: '',
      image_url: ''
    };
    this.fetchUser()
  }


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

  handleLogoutSubmit = (event) => {
    this.service.logout()
      .then(()=>{
        this.setState({
          username: null,
          password: null,
          redirectToHome :true,
          error: false
        });

      })
      .catch(()=>{
        return <Redirect to='/' />
      })
  }

  handleImageSubmit = (event) => {
      event.preventDefault();

    this.service.uploadPicture(this.state)
      .then((response)=>{
          this.setState({
              ...this.state,
            loggedInUser: response.userUpdated,
            username : this.state.loggedInUser.username,
            image_url : response.userUpdated.image
          })
      })
      .catch(()=>{
        return <Redirect to='/' />
      })
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({[name]: value});

  }

  handleChangeFile = (event) => {
      const {name, files} = event.target;
      this.setState({[name]: files});
  }


  handlerLogout = (e)=>{
    e.preventDefault();
    this.props.logoutHandler();
    this.setState({
      username: null,
      password: null,
      redirectToHome :true,
      error: false
    })
    //this.props.history.push('/')
  }

  render() {
    console.log(this.state)
    const redirectToHome = this.state.redirectToHome;
    if (redirectToHome === true) {
      return <Redirect to="/" />
    }
    return (
      <div>
        <h3>Profile</h3>
        <p>Username</p>

        { this.state.loggedInUser !== null &&
          <div>
            <p>{this.state.loggedInUser.username}</p>
            <img src={this.state.loggedInUser.image_url}></img>
          </div>
        }

        <form onSubmit={ e => this.handleImageSubmit(e)}>
          <fieldset>
            <label>Update picture</label>
            <input type="file" name="image"  onChange={ e => this.handleChangeFile(e)} />
            <input type="submit" value="Update image" ></input>
          </fieldset>
        </form>


        <form onSubmit={ e=> this.handlerLogout(e)}>
          <input type="submit" value="Logout" ></input>
        </form>
      </div>
    )

  }
}

export default Profile;