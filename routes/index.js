var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", {
    title: "Home | Acharya Football League",
    titleimage: "http://www.acharya.ac.in/img/Acharya_Logo1.PNG",
    image : "https://micras.org/wiki/images/7/77/Victoria_national_football_team_logo_2014.png",
    image1 : "https://kassiesa.net/uefa/clubs/images/Dundee-FC.png"
  });
});

module.exports = router;
