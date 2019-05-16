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

  signup = (username, password, name, email) => {
    return this.service.post('/auth/signup', {username, password, name, email})
    .then(response => {
      //console.log(response)
      return response.data;
    })
    .catch (err => console.log(err))
  }

  login = (username, password) => {
    return this.service.post('/auth/login', {username, password})
    .then(response => response.data)
    .catch (err => console.log(err.data))
  }

  loggedin = () => {
    return this.service.get('/auth/loggedin',)
    .then((response) => response.data)
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
      .post('/auth/uploadpic', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => response.data )
      .catch(
          err => err.data
      )
  }


  changeStrainFavoriteList = (idStrain,idUser,action) => {
    let result = null;
    if(action){
      //console.log("Client strainFavAdd ", idUser, idStrain);
      return this.service.put(`/auth/strainFavAdd/${idStrain}`)
        .then(response => {
          //console.log(response);
          return response.data;
        })
    }else{
      //console.log("strainFavRemove ", idUser, idStrain);
      return this.service.put(`/auth/strainFavRemove/${idStrain}`)
        .then(response => {
          //console.log(response);
          return response.data;
        })}

  }


  getUserById = (id) =>{
    return this.service.get(`user/${id}`,)
    .then(response => {
      return response.data
    })
  }
}

export default AuthService;