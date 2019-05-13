const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/:id", (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      res.json(user);
    })
    .catch(err => res.json(err));
});

module.exports = router;