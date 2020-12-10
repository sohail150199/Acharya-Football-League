const express = require("express");
const router = express.Router();

router.get("/", function(req, res){
    res.render("login", {
        title : "Authenticate",
        heading : "Enter Password",
        msg : ""
    });
});

module.exports = router;