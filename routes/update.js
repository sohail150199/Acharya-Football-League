const express = require("express");
const router = express.Router();
const con = require("../connection");

router.post("/", function(req, res) {
  if (req.body.passwd === "admin") {
    res.render("update", {
      title: "Update Score Here",
      heading: "Update Scores"
    });
  } else {
    res.redirect("/login", 400, {
      title: "Authenticate",
      heading: "Enter Password Again",
      msg: "Invalid Credentials"
    });
  }
});

router.post("/insert", function(req, res) {
  if (req.body.goal1 == "") {
    var x = req.body.goal2;
  }
  if (req.body.goal2 == "") {
    var x = req.body.goal1;
  }
  con.connect(function() {
    var usn = req.body.player_usn;
    var goal;
    if (!req.body.goal1) {
      goal = req.body.goal2;
    }
    if (!req.body.goal2) {
      goal = req.body.goal1;
    }
    usn = usn.toUpperCase();
    if (goal > 5) {
      var sql = "INSERT INTO `motf` VALUES('" + usn + "')";
      con.query(sql, function(err, result, fields) {
        if (err) throw err;
        console.log(result);
        console.log("INSERTED INTO manofthematch with trigger")
      });
      var sql1 = "INSERT INTO `goals` VALUES('" + goal + "','" + usn + "')";
      con.query(sql1, function(err, result, fields) {
        if (err) throw err;
        console.log("INSERTED INTO goal trigger")
      });
    } else {
      var sql = "INSERT INTO `goals` VALUES('" + goal + "','" + usn + "')";
      con.query(sql, function(err, result, fields) {
        if (err) throw err;
        else console.log("inserted into only goals");
      });
    }
  });
});

module.exports = router;
