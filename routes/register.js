const express = require("express");
const con = require("../connection");
const router = express.Router();

router.get("/", function(req, res) {
  res.render("register", {
    msg: ""
  });
});

module.exports = router;
