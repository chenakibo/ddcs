/**
 * Created by Administrator on 2017/5/8.
 */
/**
 * author:chenkaibo
 */
var express = require("express");
var router = express.Router();
var logMgr = require("./login_manager/log_manager");
var userMgr = require("./user_manager/user_service")


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
            res.writeHead(200, {"Content-Type" : "text/html"});
            res.write(retJsonData);
            res.end();
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
        }
    }

    var method = req.method;
    var url = req.baseUrl;
    var postData = req.body.postData;
    switch (url){
        case "/login":{
            logMgr.login(postData,callback);
        };
        case "/logout":{
            logMgr.logout(postData,callback);
        };
        case "/user":{
            console.log("user:"+postData)
            userMgr.triggerFunction(postData,callback)
        }
    }
});
module.exports=router;