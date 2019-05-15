const express = require("express");
const router = express.Router();
const Strain = require("../models/Strain");

const uploadCloud = require("../config/cloudinary");

router.get("/allStrains", (req, res, next) => {
  Strain.find()
  // .skip(+req.params.offset)
  // .limit(8)
    .then(allStrains => {
      res.json(allStrains);
    })
    .catch(err => res.json(err));
});

router.get("/allStrainsNumber", (req, res, next) => {
  Strain.find()
    .then(allStrains => {
      res.json(allStrains.length);
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

router.get("/filter/", (req, res, next) => {
  Strain.find({
    $and: [
      { name: { $regex: req.query.name, $options: "i" } },
      { flavors: { $regex: req.query.flavour, $options: "i" } },
      { positive_effects: { $regex: req.query.positive, $options: "i" } },
      { medical_effects: { $regex: req.query.medical, $options: "i" } },
      { race: { $regex: req.query.race, $options: "i" } }
    ]
  })
    .then(filteredStrains => {
      res.json(filteredStrains);
    })
    .catch(err => res.json(err));
});

router.get("/name_filter/:name", (req, res, next) => {
  Strain.find({ name: { $regex: req.params.name, $options: "i" } })
    .then(filteredStrains => {
      res.json(filteredStrains);
    })
    .catch(err => res.json(err));
});

router.get('/findAllEffects/:effectType',(req,res,next) => {
  Strain.find()
    .then(allStrains => {
      let effects = [];
      allStrains = allStrains.map(strain => strain[req.params.effectType]);
      allStrains.forEach(el => (effects = effects.concat(el)));
      res.json(effects = [...new Set(effects)].sort());
    })
    .catch(err => res.json(err));
});

router.get('/findAllRaces',(req,res,next) => {
  Strain.find()
    .then(allStrains => {
      allStrains = allStrains.map(strain => strain.race);
      res.json(allStrains = [...new Set(allStrains)].sort());
    })
    .catch(err => res.json(err));
});

router.get('/findAllFlavors',(req,res,next) => {
  Strain.find()
    .then(allStrains => {
      let flavors= [];
      allStrains = allStrains.map(strain => strain['flavors']);
      allStrains.forEach(el => (flavors = flavors.concat(el)));
      res.json(flavors = [...new Set(flavors)].sort());
    })
    .catch(err => res.json(err));
});

router.post("/uploadpic", uploadCloud.single("image"), (req, res, next) => {
  console.log(req.body.strainId)
  Strain.findByIdAndUpdate(
    req.body.strainId,
    { $set: { image_url: req.file.url } },
    { new: true }
  )
    .then(strainUpdated => {
      if (strainUpdated === null) {
        next(res.status(500).json({ error: "Strain not found" }));
        return;
      }
      res.status(200).json({ strainUpdated });
    })
    .catch(err => {
      next(res.status(500).json({ error: "Something went wrong" }));
    })
    .catch(err => {
      next(res.status(500).json({ error: "Strain not found" }));
    });
});

module.exports = router;
