// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js
// require('dotenv').config({path:__dirname+'./../.env'})
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const mongoose = require("mongoose");
const request = require("request-promise");
const Strain = require("../models/Strain");
let mongodb = process.env.REACT_APP_MONGO
console.log(__dirname)
console.log(mongodb)
mongoose
  .connect(mongodb, { useNewUrlParser: true })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

let strainsToDB = [];

Strain.deleteMany().then(() => {
  request(`http://strainapi.evanbusse.com/${process.env.API_KEY}/strains/search/all`).then(
    allStrains => {
      strains = JSON.parse(allStrains);
      let allStrainsKeys = Object.keys(strains);

      allStrainsKeys.forEach(strainKey => {
        request(
          `http://strainapi.evanbusse.com/${process.env.API_KEY}/strains/data/desc/${
            strains[strainKey].id
          }`
        ).then(description => {
          let { race, flavors, effects } = strains[strainKey];
          newStrain = new Strain({
            race: race,
            name: strainKey,
            flavors: flavors,
            positive_effects: effects.positive,
            negative_effects: effects.negative,
            medical_effects: effects.medical,
            stock: "",
            image_url: "",
            description: JSON.parse(description).desc
          });
          newStrain
            .save()
            .then(() => {
              console.log("ok");
            })
            .catch(err => console.log(err));
        });
      });
    }
  );
});
