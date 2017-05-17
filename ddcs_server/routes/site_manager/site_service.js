/**
 * Created by Administrator on 2017/5/8.
 */
var siteDao = require("./site_dao");

var siteOperFunc = {
    enumSiteList : enumSiteList,
    deleteSite : deleteSite,
};
/*
* 响应给页面的数据
* */
var rtRes = {
    rstcode:"error",
    desc:"",
    data:{}
};
/*
* 处理站点操作的service
* */
function triggerFunction(jsonData,callback) {
    if(typeof callback != "function"){
        return;
    };

    var mainRequest = jsonData.request.mainRequest;
    var operFunc = siteOperFunc[mainRequest];
    if(typeof operFunc != "function"){
        callback(rtRes);
    }else {
        operFunc(jsonData,callback);
    }
};
exports.triggerFunction = triggerFunction;

/*
* 获取站点列表
* */
function enumSiteList(jsonData,callback) {

    if (typeof callback != "function"){
        return;
    };

    siteDao.getInstance().enumSiteListMgr(jsonData,function (err,rst) {
        if(err){
            rtRes.desc = err.detail;
        }else {
            rtRes.rstcode = "success";
            rtRes.data = rst;
        }
        callback(JSON.stringify(rtRes));
        return;
    })
};
/*
* 删除站点的业务层
* */
function deleteSite(jsonData,callback) {
    if(typeof callback != "function"){
        return;
    };
    siteDao.getInstance().deleteSiteMgr(jsonData,function (err) {
        if(err){
            rtRes.desc = err.detail;
        }else{
            rtRes.rstcode = "success";
        };
        callback(JSON.stringify(rtRes));
    })
}