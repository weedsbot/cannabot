import React, { Component } from 'react';
import AuthService from '../services/AuthService';
import { Redirect, Link, BrowserRouter } from 'react-router-dom';

class Profile extends Component {
  constructor(props){
    super(props);
    this.state = { username: props.username,  image:'' };
    this.service = new AuthService();
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
              image : response.userUpdated.image
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
    const redirectToHome = this.state.redirectToHome;
    if (redirectToHome === true) {
      return <Redirect to="/" />
    }
    return (
      <div>
        <h3>Profile</h3>
        <p>Username</p>
        <p>{this.props.username}</p>
        <img src={this.props.image}></img>
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