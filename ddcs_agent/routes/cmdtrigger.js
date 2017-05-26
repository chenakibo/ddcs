/**
 * Created by Administrator on 2017/5/23.
 */
/**
 * Created by Administrator on 2017/5/8.
 */
var _ = require('lodash');
var ps = require('current-processes');

var siteOperFunc = {
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
function triggerFunction(cmd,callback) {
    if(typeof callback != "function"){
        return;
    };

    var mainRequest = cmd;
    var operFunc = siteOperFunc[mainRequest];
    if(typeof operFunc != "function"){
        callback(rtRes);
    }else {
        operFunc(callback);
    }
};
exports.triggerFunction = triggerFunction;

function getUsageRate(callback) {
    if (typeof callback != "function"){
        return;
    };
    ps.get(function(err, processes) {

        var sorted = _.sortBy(processes, 'cpu');
        var top5  = sorted.reverse().splice(0,7);
        callback(err,top5);
    });
}