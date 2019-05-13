const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const mongoose = require("mongoose");
const Favorite = require("../models/Favorite");

let mongodb = process.env.MONGO;
console.log(__dirname);
console.log(mongodb);

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


let favoritesUser01 = [
  {"idStrain":"5cd3ef5083ec6d2019913566", "idUser":"5cd46b1ec98b134c4af68dc7"},
  {"idStrain":"5cd3ef5083ec6d2019913568", "idUser":"5cd46b1ec98b134c4af68dc7"},
  {"idStrain":"5cd3ef5083ec6d2019913567", "idUser":"5cd46b1ec98b134c4af68dc7"},
  {"idStrain":"5cd3ef5083ec6d201991356b", "idUser":"5cd46b1ec98b134c4af68dc7"}
];


Favorite.deleteMany()
  .then(() => {
    return Favorite.create(favoritesUser01)
  })
  .then(favoritesCreated => {
    console.log(`${favoritesCreated.length} favorites created with the following id:`);
    console.log(favoritesCreated.map(p => p._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect()
  })
  .catch(err => {
    mongoose.disconnect()
    throw err
  })