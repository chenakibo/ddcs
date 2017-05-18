/**
 * Created by Administrator on 2017/5/8.
 */
/*
* 用户操作的数据库交互模块
* */
var dbOpt = require("../utils/db_conection");
var _dbOpt = new dbOpt();
var userMgr=(function() {
    var _inst;
    function userMgrCtrl() {
        return {
            createUserMgr:createUserMgr,
            modifyUserMgr:modifyUserMgr,
            deleteUserMgr:deleteUserMgr,
            showUserInfoMgr:showUserInfoMgr,
        };
    };
    return{
        getInstance:function () {
            if(_inst == undefined){
                _inst = new userMgrCtrl();
            };
            return _inst;
        }
    };
})();
module.exports=userMgr;
function createUserMgr(jsonData,callback) {
    if(typeof callback != "function"){
        return;
    };
    var sqlText = "INSERT INTO tbl_user(username,password,email,usertype,mobile,createtime,lastmodtime) " +
        "VALUES($1,$2,$3,$4,$5,$6,$7);";
    var sqlValue = [
        jsonData.data.name,
        jsonData.data.pwd,
        jsonData.data.email,
        jsonData.data.usertype,
        jsonData.data.mobile,
        jsonData.data.createtime,
        jsonData.data.lastmodtime
    ];
    _dbOpt.execSql(sqlText,sqlValue,function (err,rst) {
        callback(err);
    })
};
function modifyUserMgr() {
    
};
function deleteUserMgr() {
    
};
function showUserInfoMgr(jsonData,callback) {
    if(typeof callback != "function"){
        return;
    };
    var sqlText = "select * from tbl_user where username=$1;";
    var sqlValue = [jsonData.data.currUserName];
    _dbOpt.querySql(sqlText,sqlValue,function (err,count,rst) {
        callback(err,rst);
    })
}