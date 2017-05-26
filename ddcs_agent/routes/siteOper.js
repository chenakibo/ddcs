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
        "port":"5656",
        "state":"",
        "lastmodtime":""
    };
    if(os.platform() == "win32"){
        siteInfo.id = createmd5(os.networkInterfaces().本地连接[1].address);
        siteInfo.ip = os.networkInterfaces().本地连接[1].address;
    }
    if(os.platform() == "linux"){
        var network = os.networkInterfaces();
        for(var item in network){
            if(item.indexOf("eth") == 0 || item.indexOf("ens") == 0){
                siteInfo.id = createmd5(network[item][0].address);
                siteInfo.ip = network[item][0].address;
                break;
            };
            // if( item == "eth1"){
            //     siteInfo.id = createmd5(network.eth1[0].address);
            //     siteInfo.ip = network.eth1[0].address;
            //     break;
            // };
        }
        // siteInfo.id = createmd5(os.networkInterfaces().eth0[0].address);
        // siteInfo.ip = os.networkInterfaces().eth0[0].address;
    }
    siteInfo.name = os.hostname();
    siteInfo.state = "1";
    siteInfo.lastmodtime = new Date().getTime();

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
    if(os.platform() == "win32"){
        hostConfig.id = createmd5(os.networkInterfaces().本地连接[1].address);
        hostConfig.ip = os.networkInterfaces().本地连接[1].address;
    }
    if(os.platform() == "linux"){
        var network = os.networkInterfaces();
        for(var item in network){
            if(item.indexOf("eth") == 0 || item.indexOf("ens") == 0){
                hostConfig.id = createmd5(network[item][0].address);
                hostConfig.ip = network[item][0].address;
                break;
            };
            // if( item == "eth1"){
            //     siteInfo.id = createmd5(network.eth1[0].address);
            //     siteInfo.ip = network.eth1[0].address;
            //     break;
            // };
        }
        // hostConfig.id = createmd5(os.networkInterfaces().eth0[0].address);
        // hostConfig.ip = os.networkInterfaces().eth0[0].address;
    }
    hostConfig.cpuInfo = os.cpus()[0].model;
    hostConfig.cpuNumber = os.cpus().length;
    hostConfig.totalMem = os.totalmem();
    return hostConfig;
};
exports.getHostConfig=getHostConfig;