// auth/auth-service.js
import axios from 'axios';
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
let baseURL = process.env.REACT_APP_URL;

class AuthService {
  constructor() {
    this.service = axios.create({
      baseURL: baseURL,
      withCredentials: true
    });
  }

  signup = (username, password, campus, course) => {
    return this.service.post('/auth/signup', {username, password, campus, course})
    .then(response => {
      return response.data;
    })
  }

  login = (username, password) => {
    return this.service.post('/auth/login', {username, password})
    .then(response => response.data)
  }

  loggedin = () => {
    return this.service.get('/auth/loggedin',)
    .then(response => response.data)
  }

  logout = () => {
    console.log("Logout client");
    return this.service.get('/auth/logout',)
    .then(response => response.data)
  }

  uploadPicture(props) {
    const formData = new FormData();
    formData.append("username", props.username);
    formData.append("image", props.image[0]);
    return this.service
      .post('/auth/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => response.data )
      .catch(
          err => err.data
      )
  }

  getUserById = (id) =>{
    return this.service.get(`user/${id}`,)
    .then(response => {
      return response.data
    })
  }
}

export default AuthService;