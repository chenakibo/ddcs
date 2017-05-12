/**
 * Created by Administrator on 2017/5/8.
 */
var dbOpt = require("../utils/db_conection");
// var userOnline = require("./onlinectrl");
// var MD5 = require("../utils/api");

var _dbOpt = new dbOpt();

exports.login=function (jsonData,callback) {

    if(typeof callback != "function"){
        return
    }

    var rtRes = {
        rstcode:"error",
        desc:"",
        data:{
            username:"",
            role:""
        }
    }

    var sqlText = "select * from tbl_user where username=$1 and password=$2;";
    var sqlValue = [jsonData.data.name,jsonData.data.pwd];
    _dbOpt.querySql(sqlText,sqlValue,function (err,count,rst) {
        if(err){
            rtRes.desc = err.detail;
            callback(JSON.stringify(rtRes));
        }else if(count == 0){
            rtRes.desc = "用户名或密码输入错误！"
            callback(JSON.stringify(rtRes));
        }else {
            rtRes.rstcode = "success";
            rtRes.data.username = rst[0].username;
            rtRes.data.role = rst[0].usertype;
            callback(JSON.stringify(rtRes));
        }
        return;
    })
};
exports.logout=function (jsonData,callback) {
    var rtRes = {
        rstcode: "success",
        desc:"",
        data:''
    };
    // var user = {};
    // user.name = jsonData.data.name;
    // user.id = jsonData.postUserHandle || "";

}