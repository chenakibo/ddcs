/**
 * Created by Administrator on 2017/5/8.
 * 处理站点的数据库操作
 */

var dbOpt = require("../utils/db_conection");
var _dbOpt = new dbOpt();

var dataMgr = (function () {
    var _inst;
    function dataMgrCtrl() {
        return{
            enumRunSiteListMgr:enumRunSiteListMgr,
            getHostConfigInfoMgr:getHostConfigInfoMgr
        }
    };
    return{
        getInstance:function () {
            if(_inst == undefined){
                _inst = new dataMgrCtrl();
            };
            return _inst;
        }
    };
})();
module.exports = dataMgr;

/*
 * 获取运行站点的数据库操作
 * */
function enumRunSiteListMgr(jsonData,callback) {
    if(typeof callback != "function"){
        return
    };

    var sqlText = "select * from tbl_site where state=$1;";
    var sqlValue = ["1"];
    _dbOpt.querySql(sqlText,sqlValue,function (err,count,rst) {
        callback(err,rst);
    })
};
/*
* 获取主机配置信息的数据库操作
* */
function getHostConfigInfoMgr(jsonData,callback) {
    if(typeof callback != "function"){
        return
    };

    var sqlText = "select * from tbl_hostconfig where id=$1";
    var sqlValue = [jsonData.data.id];
    _dbOpt.querySql(sqlText,sqlValue,function (err,count,rst) {
        callback(err,rst);
    })
}