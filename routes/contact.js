const express = require("express");
const nodemailer = require("nodemailer");
const con = require("../connection");
const router = express.Router();

/* GET Contact page. */
router.get("/", function(req, res, next) {
  res.render("contact", {
    title: "Contact Us | Acharya Football League",
    image: "",
    msg: ""
  });
});

router.post("/send", function(req, res, next) {
  const output = `
  <link href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
  <div class="container">
        <h1 class="text-center">Contact Request</h1>
        <div class="row">
            <div class="col-md-4"></div>
            <div class="col-md-4">
                <div>
                    <h3>
                        <u>Tell us the complaint</u>
                    </h3>
                    <div>
                        <label>Name : </label>
                        <span>${req.body.name}</span>
                    </div>
                    <div>
                        <label>Email : </label>
                        <span>${req.body.email}</span>
                    </div>
                    <div>
                        <label>Contact : </label>
                        <span>${req.body.mobile}</span>
                    </div>
                    <div>
                        <label>Subject : </label>
                        <span>${req.body.subject}</span>
                    </div>
                    <div>
                        <label><b>Message : </b></label>
                        <h2>${req.body.messages}</h2>
                    </div>
                </div>
            </div>
            <div class="col-md-4"></div>
        </div>
    </div>
  `;
  let transporter = nodemailer.createTransport({
    // service: "gmail",
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: "y7ususcvj7tnews4@ethereal.email",
      pass: "xjC9qCx8MBdpWr4B67"
      // user: "jayesh203.jp@gmail.com", // generated ethereal user
      // pass: "tlgpqhcalaazqqfj" // generated ethereal password
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Sohail Ansari   👻" <sohail150199@gmail.com>', // sender address
    to: "info@acharya.ac.in", // list of receivers
    subject: "Complaint About Website", // Subject line
    text: "Hi there", // plain text body
    html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    con.connect(function() {
      var sql =
        "INSERT INTO `contact`(`name`,`email`, `mobile`, `subject`, `messages`) VALUES ('" +
        req.body.name +
        "','" +
        req.body.email +
        "','" +
        req.body.mobile +
        "','" +
        req.body.subject +
        "','" +
        req.body.messages +
        "')";
      con.query(sql, function(err, result) {
        if (err) throw err;
      });
    });
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.render("contact", {
      title: "Contact Us | Acharya Football League",
      image: "http://www.acharya.ac.in/img/Acharya_Logo1.PNG",
      msg: "Email has been Sent. Thankyou for Contacting Us"
    });
  });
});

module.exports = router;
