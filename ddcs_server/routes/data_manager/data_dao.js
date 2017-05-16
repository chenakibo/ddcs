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
            enumStartSiteListMgr:enumStartSiteListMgr
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
* 获取站点列表的数据库操作
* */
function enumStartSiteListMgr(jsonData,callback) {

    if (typeof callback != "function"){
        return;
    };

    var sqlText = "select * from tbl_site where state=$1;";
    var sqlValue = ["1"];
    _dbOpt.querySql(sqlText,sqlValue,function (err, count, rst) {
          callback(err,rst);
    })
}