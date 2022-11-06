var express = require("express");
var router = express.Router();

const fetch = require("node-fetch");
const User = require("../models/users");
const {checkBody} = require("../modules/checkBody")

router.post("/signup", (req, res) => {
  if (
    !checkBody(req.body, ["name", "email", "password"])
    // !req.body.name || !req.body.email || !req.body.password
   
    // req.body.email === "" ||
    // req.body.email === undefined ||
    // req.body.password === "" ||
    // req.body.password === undefined
  ) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  User.findOne({ email: req.body.email }).then((data1) => {
    if (data1 === null) {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      newUser.save().then(() => {
        res.json({ result: true });
      });
    } else {
      res.json({ result: false, error: 'User already exists' });
    }
  });
});

router.post("/signin", (req, res) => {
    if (
      !checkBody(req.body, ["email", "password"])
      // !req.body.email || !req.body.password

    // req.body.email === "" ||
    // req.body.email === undefined ||
    // req.body.password === "" ||
    // req.body.password === undefined
    ) {
      res.json({ result: false, error: "Missing or empty fields" });
      return
    } 

    User.findOne({ email: req.body.email, password: req.body.password }).then((data) => {
      if(data) {
      // !data.some(
      //   (e) => e.email === req.body.email && e.password === req.body.password
      // )
      res.json({ result: true });
    } else {
      res.json({ result: false, error: "User not found" });
    }
  });
});

module.exports = router;
