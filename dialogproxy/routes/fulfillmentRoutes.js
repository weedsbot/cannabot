const {WebhookClient, Payload} = require('dialogflow-fulfillment');
const express = require("express");
const axios = require('axios');
const router = express.Router();



router.post('/', async (req, res) => {
    const agent = new WebhookClient({ request: req, response: res });

    function snoopy(agent) {
        agent.add(`Welcome to my Cannabot fulfillment!`);
    }

    function fallback(agent) {
        agent.add(`I didn't understand`);
        agent.add(`I'm sorry, can you try again?`);
    }

    async function solve_headache(agent) {
        let strains;
        let allStrains;
        let message = 'Te voy a dar cosita buena...';
        let endPointUrl = 'http://localhost:4000/api/strains/filter?name=&race=&medical=Headache&positive=&flavour=';

          await axios.get(endPointUrl)
          .then(response=>{
            strains = response.data.map(strain=>strain.name);
            strains =strains.slice(0,5).join(", ");              
            allStrains = response.data;              
          })
          .catch(err=>{err})      


        let payloadJson = {
            "platform":"PLATFORM_UNSPECIFIED",
            "input":{
            "textresponse":`${message} ${strains}`,
            "strainslist":allStrains}
            }
        console.log("Custom payload:  ", payloadJson);
        agent.requestSource= agent.PLATFORM_UNSPECIFIED;
        let payloadCustom = new Payload('PLATFORM_UNSPECIFIED' , payloadJson);        
        agent.add(payloadCustom);
    }

    async function like_flavor(agent) {
        let strains;
        let allStrains;
        let message = 'Esto está muuuuuu rico...\n';
        let endPointUrl = 'http://localhost:4000/api/strains/filter?name=&race=&medical=&positive=&flavour=mint';

        await axios.get(endPointUrl)
        .then(response=>{
          strains = response.data.map(strain=>strain.name);
          strains =strains.slice(0,5).join(", ");              
          allStrains = response.data;              
        })
        .catch(err=>{err})      


      let payloadJson = {
          "platform":"PLATFORM_UNSPECIFIED",
          "input":{
          "textresponse":`${message} ${strains}`,
          "strainslist":allStrains}
          }
      console.log("Custom payload:  ", payloadJson);
      agent.requestSource= agent.PLATFORM_UNSPECIFIED;
      let payloadCustom = new Payload('PLATFORM_UNSPECIFIED' , payloadJson);        
      agent.add(payloadCustom);
    }

    let intentMap = new Map();
    intentMap.set('snoopy', snoopy);
    // intentMap.set('learn courses', learn);
    // intentMap.set('recommend courses - yes', registration);
    intentMap.set('cure headache', solve_headache);
    intentMap.set('like mint', like_flavor);
    intentMap.set('Default Fallback Intent', fallback);

    agent.handleRequest(intentMap);

});





module.exports = router;