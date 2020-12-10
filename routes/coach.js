const express = require("express");
const con = require("../connection");
const router = express.Router();

router.get("/", function (req, res) {
  res.render("coach", {
    msg: ""
  });
});

router.post("/", function (req, res) {
  con.connect(function () {
    var coach = {
      coach_id: req.body.coach_id,
      coach_name: req.body.name,
      email: req.body.email,
      contact: req.body.contact,
      gender: req.body.gender,
      team_id : req.body.team_id
    }
    // var sql =
    //   "INSERT INTO `coachs`(`usn`, `name`,`age`, `email`, `contact`, `gender`, `team_id`) VALUES ('" +
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
    con.query('call newCoach(?,?,?,?,?,?)', [coach.coach_id, coach.name, coach.email, coach.contact, coach.gender, coach.team_id], function (err, result) {
      if (err) throw err;
    });
  });
  res.render("coach", {
    msg: "Thankyou for the Registration. You have Registered Successfully"
  });
});


module.exports = router;