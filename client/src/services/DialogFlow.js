import axios from 'axios';
import AuthService from "./AuthService";
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
let baseURL = process.env.URL;

class DialogFlow {
  constructor(props) {
    this.service = axios.create({
      baseURL: baseURL,
      withCredentials: true
    });
    this.googleProjectID = props.googleProjectID;
    this.dialogFlowSessionID = props.dialogFlowSessionID;
  }


  getClientToken = ()=>{
    return axios.get('/api/get_client_token');
  }

  sendRequest = (request, config, cookies)=>{
    return axios.post(
      'https://dialogflow.googleapis.com/v2/projects/' + this.googleProjectID +
      '/agent/sessions/' + this.dialogFlowSessionID + cookies.get('userID') + ':detectIntent',
      request,
      config
    )
  }
}

export default DialogFlow;