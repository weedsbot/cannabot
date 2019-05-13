const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const favoriteSchema = new Schema({
  idUser: {type: Schema.Types.ObjectId, ref:'User'},
  idStrain: {type: Schema.Types.ObjectId, ref:'Strain'}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Favorite = mongoose.model('Favorite', favoriteSchema);
module.exports = Favorite;