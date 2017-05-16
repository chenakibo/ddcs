/**
 * Created by Administrator on 2017/5/15.
 */
/*
* 首次连接数获取主机信息
* */
var os = require("os");
var crypto = require("crypto");
var buffer = require("buffer").Buffer;
/*
* 获取站点信息
* */
function getSiteInfo() {
    var siteInfo = {
        "id":"",
        "name":"",
        "ip":"",
        "port":"7878",
        "state":""
    };
    siteInfo.id = createmd5(os.networkInterfaces().本地连接[1].address);
    siteInfo.name = os.hostname();
    siteInfo.ip = os.networkInterfaces().本地连接[1].address;
    siteInfo.state = "1";

    return siteInfo;
}

exports.getSiteInfo = getSiteInfo;
/*
* md5加密
* */
function createmd5(data) {
    var buf = new buffer(data);
    var str = buf.toString("binary");
    return crypto.createHash("md5").update(str).digest("hex");
}
/*
* 获取主机配置信息
* */
function getHostConfig() {
    var hostConfig = {
        "hostname":"",
        "platform":"",
        "arch":"",
        "ip":"",
        "cpuInfo":"",
        "cpuNumber":"",
        "totalMem":""
    };
    hostConfig.hostname = os.hostname();
    hostConfig.platform = os.platform();
    hostConfig.arch = os.arch();
    hostConfig.ip = os.networkInterfaces().本地连接[1].address;
    hostConfig.cpuInfo = os.cpus()[0].model;
    hostConfig.cpuNumber = os.cpus().length;
    hostConfig.totalMem = os.totalmem();
    return hostConfig;
};
exports.getHostConfig=getHostConfig;