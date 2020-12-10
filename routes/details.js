const express = require("express");
const router = express.Router();
const playerdetailsRepo = require("../repositories/playerDetails");
const coachdetailsRepo = require("../repositories/coachDetails");
const manOfTheMatchRepo = require("../repositories/manOfTheMatch");


router.get("/", function (req, res) {
  res.render("detail", {
    title: "Detail Page",
    msg: "Cick on one to see the details of the members",
    image: "http://www.acharya.ac.in/img/Acharya_Logo1.PNG"
  });
});

router.get("/getTeamPlayers", function (req, res) {
  var teamPlayers = playerdetailsRepo.getTeamPlayers(req.query.teamId);
  teamPlayers.then(function (player) {
    res.send(player);
  })
})

// Get Player Details
router.get("/players", function (req, res, next) {
  var players = playerdetailsRepo
    .getPlayers()
    .then(players => {
      res.render("playerdetails", {
        title: "Player Details | Acharya Football League",
        image: "http://www.acharya.ac.in/img/Acharya_Logo1.PNG",
        players: players
      });
    })
    .catch(error => {
      console.log(error);
    });
});

//Get Coach Details
router.get("/coach", function (req, res, next) {
  var coach = coachdetailsRepo
    .getCoaches()
    .then(coach => {
      res.render("coachdetail", {
        title: "Coach Details | Acharya Football League",
        image: "http://www.acharya.ac.in/img/Acharya_Logo1.PNG",
        coach: coach
      });
    })
    .catch(error => {
      console.log(error);
    });
});

router.get("/manOfTheMatch", function (req, res, next) {
  var motf = manOfTheMatchRepo
    .getmanOfTheMatch()
    .then(motf => {
      res.render("manOfTheMatch", {
        title: "Man Of The Match Details | Acharya Football League",
        image: "http://www.acharya.ac.in/img/Acharya_Logo1.PNG",
        motf: motf
      });
    })
    .catch(error => {
      console.log(error);
    });
});



module.exports = router;