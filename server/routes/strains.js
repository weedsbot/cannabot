const express = require("express");
const router = express.Router();
const Strain = require("../models/Strain");

router.get("/allStrains", (req, res, next) => {
  Strain.find()
    .then(allStrains => {
      res.json(allStrains.slice(0,20));
    })
    .catch(err => res.json(err));
});

router.get("/strain/:id", (req, res, next) => {
  Strain.findById(req.params.id)
    .then(strain => {
      res.json(strain);
    })
    .catch(err => res.json(err));
});

router.get("/effects_filter", (req, res, next) => {
  Strain.find({
      $and: [
        { "negative_effects": { "$regex": req.query.negative, "$options": "i" } },
        { "positive_effects": { "$regex": req.query.positive, "$options": "i" } },
        { "medical_effects": { "$regex": req.query.medical, "$options": "i" } } ,
        { "race": { "$regex": req.query.race, "$options": "i" } }   
      ]
  })
    .then(filteredStrains => {
      res.json(filteredStrains);
    })
    .catch(err => res.json(err));
});

router.get("/name_filter/:name", (req, res, next) => {
  Strain.find({ "name": { "$regex": req.params.name, "$options": "i" } },
  )
    .then(filteredStrains => {
      res.json(filteredStrains);
    })
    .catch(err => res.json(err));
});


findAllEffects = effectType => {
  Strain.find()
    .then(allStrains => {
      let effects = [];
      allStrains = allStrains.map(strain => strain[effectType]);
      allStrains.forEach(el => (effects = effects.concat(el)));
      return (effects = [...new Set(effects)]);
    })
    .catch(err => res.json(err));
};

findAllRaces = () => {
  Strain.find()
    .then(allStrains => {
      allStrains = allStrains.map(strain => strain.race);
      return (allStrains = [...new Set(allStrains)]);
    })
    .catch(err => res.json(err));
};

module.exports = router;
