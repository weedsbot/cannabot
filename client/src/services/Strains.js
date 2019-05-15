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

  allStrains = (offset) => {
    return this.service.get(`/strains/allStrains/${offset}`)
      .then(response => {
        return response.data;
      })
  }

  allStrainsNumber = () => {
    return this.service.get(`/strains/allStrainsNumber/`)
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
 
  uploadPicture(props) {
    const formData = new FormData();
    formData.append("strainId", props.idStrain);
    formData.append("image", props.image[0]);
    return this.service
      .post('/strains/uploadpic', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => response.data )
      .catch(
          err => err.data
      )
  }

  

}

export default Strains;