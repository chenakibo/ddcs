/**
 * Created by Administrator on 2017/5/8.
 */
var dataDao = require("./data_dao");

var siteOperFunc = {
    enumRunSiteList : enumRunSiteList,
    getHostConfigInfo : getHostConfigInfo
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
 * 获取运行站点列表
 * */
function enumRunSiteList(jsonData,callback) {
    if(typeof callback != "function"){
        return;
    };
    dataDao.getInstance().enumRunSiteListMgr(jsonData,function (err,rst) {
        if(err){
            rtRes.desc = err.detail;
        }else {
            rtRes.rstcode = "success";
            rtRes.data = rst;
        };
        callback(JSON.stringify(rtRes));
    })
};
function getHostConfigInfo(jsonData,callback) {
    if(typeof callback != "function"){
        return;
    };
    dataDao.getInstance().getHostConfigInfoMgr(jsonData,function (err,rst) {
        if(err){
            rtRes.desc = err.detail;
        }else {
            rtRes.rstcode = "success";
            rtRes.data = rst;
        };
        callback(JSON.stringify(rtRes));
    })
}