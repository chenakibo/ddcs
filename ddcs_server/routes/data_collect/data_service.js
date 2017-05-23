/**
 * Created by Administrator on 2017/5/8.
 */
var dataDao = require("./data_dao");

var siteOperFunc = {
    enumRunSiteList : enumRunSiteList,
    getHostConfigInfo : getHostConfigInfo,
    getUsageRate : getUsageRate
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
};
/*
* 获取使用率
* */
function getUsageRate(jsonData,callback) {
    if (typeof callback != "function"){
        return;
    };
    dataDao.getInstance().getUsageRateMgr(jsonData,function (rst) {
        var label = new Array();
        var cpu = new Array();
        var mem = new Array();
        for (var i in rst){
            label.push(rst[i].name);
            cpu.push(rst[i].cpu);
            mem.push(rst[i].mem.usage);
        };
        var retJson = {
            label:label,
            data:{
                cpu:cpu,
                mem:mem
            }
        };
        rtRes.rstcode = "success";
        rtRes.data = retJson;
        // console.log("retJson:"+JSON.stringify(rtRes))
        callback(JSON.stringify(rtRes));
    })
}