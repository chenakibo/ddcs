/**
 * Created by Administrator on 2017/5/8.
 */
var dbOpt = require("../utils/db_conection");
var userOnline = require("./onlinectrl");
var MD5 = require("../utils/api");

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
    var sqlValue = [jsonData.username,jsonData.password];
    _dbopt.querySql(sqlText,sqlValue,function (err,count,result) {
        if(err){
            rtRes.desc = err.detail;
            callback(err);
            return;
        }else if(count == 0){
            rtRes.desc = "用户名或密码错误，请重新输入！";
            callback(rtRes);
            return;
        }else {
            var userData = {}
            var sessionID = userOnline.getInstance().buildId();
            userData.id = MD5.createmd5(sessionID);
            userData.name = result[0].username;
            userData.role = result[0].usertype;
            var optTime = Math.floor((new Date().getDate())/1000);
            userData.lastOptTime = optTime.toString();
            userData.optSite = "";
            userOnline.getInstance().regOnlineUser(userData,function (flag) {
                if(flag){
                    rtRes.rstcode = "success";
                    rtRes.data.username = result[0].username;
                    rtRes.data.role = result[0].usertype;
                }else {
                    rtRes.desc = "登录失败！"
                };
                callback(rtRes);
            });
        };
    });
};
exports.logout=function (jsonData,callback) {
    var rtRes = {
        rstcode: "success",
        desc:"",
        data:''
    };
    var user = {};
    user.name = jsonData.data.name;
    user.id = jsonData.postUserHandle || "";
    userOnline.getInstance().isValidSession(user,function(bAllowed){
        if(bAllowed)
        {
            userOnline.getInstance().delOfflineUser(user,function(error){});
        }
        callback(rtRes);
    });
}