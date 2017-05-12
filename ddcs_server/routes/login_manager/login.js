/**
 * Created by Administrator on 2017/5/11.
 */
var express = require("express");
var router = express.Router();
var dbOpt = require("../utils/db_conection");
var _dbOpt = new dbOpt();

router.post("/",function (req,res,next) {
    var postData = req.body.postData;
    var jsonData = JSON.parse(postData);

    var rtRes = {
        rstcode:"error",
        desc:"",
        data:{
            name:"",
            role:""
        }
    };

    var sql = "select * from tbl_user where username=$1 and password=$2;";
    var value = [jsonData.data.name,jsonData.data.pwd];
    _dbOpt.querySql(sql,value,function (err,count,rst) {
         if(err){
             rtRes.desc=err.detail;
             res.send(JSON.stringify(rtRes));
             return
         };
         if(count == 0){
             rtRes.desc = "用户名或密码错误"
             res.send(JSON.stringify(rtRes));
             return;
         }else{
             rtRes.rstcode = "success";
             rtRes.data.name = rst[0].username;
             rtRes.data.role = rst[0].usertype;
             res.send(JSON.stringify(rtRes));
             return;
         }
    })
});
module.exports=router;