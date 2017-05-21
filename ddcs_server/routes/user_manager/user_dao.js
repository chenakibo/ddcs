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
            queryUserMgr:queryUserMgr
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
function modifyUserMgr(jsonData,callback) {
    if (typeof callback != "function"){
        return;
    };
    var sql = "select * from tbl_user where id=$1 and password=$2;";
    var value = [jsonData.data.id,jsonData.data.oldpwd];
    _dbOpt.querySql(sql,value,function (err,count,rst) {
        if(err || count == 0){
            callback(err,count);
            return;
        };
        var sqlText = "update tbl_user set password=$1 where id=$2;";
        var sqlValue = [jsonData.data.newpwd,jsonData.data.id];
        _dbOpt.execSql(sqlText,sqlValue,function (err) {
            callback(err,"1");
        })
    })
};
/*
* 删除用户的数据库操作
* */
function deleteUserMgr(jsonData,callback) {
    if(typeof callback != "function"){
        return;
    };
    var sqlText = "delete from tbl_user where id=$1;";
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
};
/*
* 用户查询的数据库操作
* */
function queryUserMgr(jsonData,callback) {
    if (typeof callback != "function"){
        return
    };
    var condition = jsonData.data.condition;
    var sqlText;
    var sqlValue;
    if(condition == "id"){
        sqlText = "select * from tbl_user where id=$1;";
        sqlValue = [jsonData.data.searchText];
    }else if(condition == "name"){
        sqlText = "select * from tbl_user where username like $1;";
        sqlValue = ["%"+jsonData.data.searchText+"%"];
    }else {
        sqlText = "select * from tbl_user where usertype=$1;";
        sqlValue = [jsonData.data.searchText];
    };
    _dbOpt.querySql(sqlText,sqlValue,function (err,count,rst) {
        callback(err,rst);
    })
}