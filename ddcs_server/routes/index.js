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
})

router.get("/siteManager",function (req,res,next) {
    res.render("siteManager")
})
module.exports = router;
