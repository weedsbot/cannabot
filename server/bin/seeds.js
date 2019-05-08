// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const request = require("request-promise");
const Strain = require("../models/Strain");

mongoose
  .connect("mongodb://localhost/cannabot", { useNewUrlParser: true })
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
  request(`http://strainapi.evanbusse.com/KgfEK0M/strains/search/all`).then(
    allStrains => {
      strains = JSON.parse(allStrains);
      let allStrainsKeys = Object.keys(strains);
      // allStrainsKeys = allStrainsKeys.slice(0, 100);

      allStrainsKeys.forEach(strainKey => {
        request(
          `http://strainapi.evanbusse.com/KgfEK0M/strains/data/desc/${
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

// .then(strainsCreated => {
//   console.log(`${strainsToDB.length} strains created`);
// })
// .then(() => {
//   // Close properly the connection to Mongoose
//   mongoose.disconnect();
// })
// .catch(err => {
//   mongoose.disconnect();
//   throw err;
// });
