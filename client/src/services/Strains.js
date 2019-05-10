// auth/auth-service.js
import axios from 'axios';
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
let baseURL = process.env.REACT_APP_URL ;

class Strains {
  constructor() {
    this.service = axios.create({
      baseURL: baseURL,
      withCredentials: true
    });
  }

  allStrains = () => {
    return this.service.get('/strains/allStrains')
      .then(response => {
        return response.data;
      })
  }

  findOneStrainById = (idStrain)=>{
    return this.service.get(`/strains/strain/${idStrain}`)
      .then(response => {
        return response.data;
      })
  }





}

export default Strains;