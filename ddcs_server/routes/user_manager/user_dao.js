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
function createUserMgr(dataInfo,callback) {
    if(typeof callback != "function"){
        return;
    };
    console.log("dataInfo:"+dataInfo)
    var sqlText = "INSERT INTO tbl_user(username,password,email,usertype,mobile,createtime,lastmodtime) " +
        "VALUES($1,$2,$3,$4,$5,$6,$7);";
    var sqlValue = [
        dataInfo.name,
        dataInfo.pwd,
        dataInfo.email,
        dataInfo.usertype,
        dataInfo.mobile,
        dataInfo.createtime,
        dataInfo.lastmodtime
    ];
    _dbOpt.execSql(sqlText,sqlValue,function (err,rst) {
        callback(err);
    })
};
function modifyUserMgr() {
    
};
function deleteUserMgr() {
    
}