/**
 * Created by Administrator on 2017/5/8.
 */
/**
 * author:chenkaibo
 */
var express = require("express");
var router = express.Router();
var logMgr = require("./login_manager/log_manager");
var userMgr = require("./user_manager/user_service");
var siteMgr = require("./site_manager/site_service");


router.post("/",function (req,res,next) {

    function callback(retJsonData)
    {
        if(res.finished)
        {
            return;
        }
        if(typeof  retJsonData == "undefined")
        {
            res.writeHead(400, {"Content-Type" : "text/html"});
            res.end();
            return;
        }

        if(typeof retJsonData != "object")
        {
            // res.setHeader( {'Content-Type': 'text/plain'})
            res.writeHead(200, {"Content-Type" : "text/html"});
            // res.setHeader("Content-Type" , "text/html")
            res.write(retJsonData);
            res.end();
            return
        }
        else
        {
            var rtRes = {
                rstcode:"error",
                desc:"system err",
                data:""
            };
            res.writeHead(501, {"Content-Type" : "text/html"});
            res.write(JSON.stringify(rtRes));
            res.end();
            return
        }
    }

    var method = req.method;
    var url = req.baseUrl;
    var postData = req.body.postData;
    var jsonData =JSON.parse(postData)
    console.log("postData:"+postData)
    switch (url){
        case "/login":{
            logMgr.login(jsonData,callback);
            return;
        };
        case "/logout":{
            logMgr.logout(jsonData,callback);
            return
        };
        case "/user":{
            userMgr.triggerFunction(jsonData,callback);
            return
        };
        case "/site":{
            siteMgr.triggerFunction(jsonData,callback);
            return;
        }
    }
});
module.exports=router;