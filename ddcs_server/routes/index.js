var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.setHeader({"Content-Type":"text/html"});
  // res.redirect("/public/pages/login.html");
    res.render("login");
  // res.end();
  // return
});

router.get("/index",function (req,res,next) {
    res.render("index");
});

router.get("/collect",function (req,res,next) {
    res.render("collect");
});
router.get("/user",function (req,res,next) {
    res.render("user");
})
module.exports = router;
