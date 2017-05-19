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
            enumUserListMgr:enumUserListMgr,
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

/*
* 获取用户列表的数据库操作
* */
function enumUserListMgr(jsonData,callback) {
    if(typeof callback != "function"){
        return;
    };

    var sqlText = "select * from tbl_user;"
    var sqlValue = [];

    _dbOpt.querySql(sqlText,sqlValue,function (err,count,rst) {
        callback(err,rst);
    })
}
/*
* 创建用户
* */
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
/*
* 修改用户信息的数据库操作
* */
function modifyUserMgr() {
    
};
/*
* 删除用户的数据库操作
* */
function deleteUserMgr(jsonData,callback) {
    if(typeof callback != "function"){
        return;
    };
    var sqlText = "delete * from tbl_user where id=$1;";
    var sqlValue = [jsonData.data.id];
    _dbOpt.execSql(sqlText,sqlValue,function (err) {
        callback(err);
    })
};
/*
* 显示用户信息的数据库操作
* */
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