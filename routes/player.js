const express = require("express");
const con = require("../connection");
const validator = require("validator");
const router = express.Router();

router.get("/", function (req, res) {
  res.render("player", {
    msg: ""
  });
});

router.post("/", function (req, res) {
  console.log(validator.isEmail(req.body.email));
  con.connect(function () {
    var player = {
      name: req.body.name,
      usn: req.body.USN,
      age: req.body.age,
      email: req.body.email,
      contact: req.body.contact,
      gender: req.body.gender,
      team_id: req.body.team_id
    }
    // var sql =
    //   "INSERT INTO `players`(`usn`, `name`,`age`, `email`, `contact`, `gender`, `team_id`) VALUES ('" +
    //   req.body.USN +
    //   "','" +
    //   req.body.name +
    //   "','" +
    //   req.body.age +
    //   "','" +
    //   req.body.email +
    //   "','" +
    //   req.body.contact +
    //   "','" +
    //   req.body.gender +
    //   "','" +
    //   req.body.team_id +
    //   "')";
    con.query('call newPlayer(?,?,?,?,?,?,?)', [player.usn, player.name, player.age, player.email, player.contact, player.gender, player.team_id], function (err, result) {
      if (err) throw err;
    });
  });
  res.render("player", {
    msg: "Thankyou for the Registration. You have Registered Successfully"
  });
});

module.exports = router;