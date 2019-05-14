const express = require("express");
const router = express.Router();
const Strain = require("../models/Strain");

const uploadCloud = require("../config/cloudinary");

router.get("/allStrains/:offset", (req, res, next) => {
  Strain.find()
  .skip(+req.params.offset)
  .limit(8)
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

router.get("/effects_filter", (req, res, next) => {
  Strain.find({
    $and: [
      { negative_effects: { $regex: req.query.negative, $options: "i" } },
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
