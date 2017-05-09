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
            deleteUserMgr:deleteUserMgr
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
        jsonData.username,
        jsonData.password,
        jsonData.email,
        jsonData.usertype,
        jsonData.mobile,
        jsonData.createtime,
        jsonData.lastmodtime
    ];
    _dbOpt.execSql(sqlText,sqlValue,function (err,rst) {
        if(err){
            callback(err);
            return;
        };
        return;
    })
};
function modifyUserMgr() {
    
};
function deleteUserMgr() {
    
}