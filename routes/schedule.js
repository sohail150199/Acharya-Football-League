const express = require("express");
const con = require("../connection");
const router = express.Router();
const scheduleRepo = require("../repositories/scheduleRepo");

router.get("/", function(req, res, next) {
  var schedules = scheduleRepo
    .getSchedules()
    .then(schedules => {
      res.render("schedule", {
        title: "Schedule of Matches | Acharya Football League",
        image: "http://www.acharya.ac.in/img/Acharya_Logo1.PNG",
        schedules: schedules
      });
    })
    .catch(error => {
      console.log(error);
    });
});

router.get("/update", function(req, res) {
  res.render("updateSchedule", {
    title: "Update Schedule of Matches",
    msg: ""
  });
});

router.post("/update", function(req, res) {
  con.connect(function() {
    var sql =
      "INSERT INTO `schedule`(`teamone`, `teamtwo`, `time`, `date`) VALUES ('" +
      req.body.teamOne +
      "','" +
      req.body.teamTwo +
      "','" +
      req.body.time +
      "','" +
      req.body.date +
      "')";
    con.query(sql, function(err, result) {
      if (err) throw err;
    });
  });
  res.render("updateSchedule", {
    title: "Update Schedule of Matches",
    msg: "Successfully Added Schedule"
  });
});

module.exports = router;
