/**
 * Created by Administrator on 2017/5/14.
 */
var net = require("net");
var serverConfig = require("../../webconfig.json").server;
var dbOpt = require("../utils/db_conection");
var _dpOpt = new dbOpt();
var client = function (port,jsonData,callback) {
    var port = port?port:serverConfig.tcpPort;
    var host = jsonData.ip;
    var client = new net.Socket();
    client.connect(port,host,function () {
        client.write(jsonData.data);
    });
    client.on("data",function (data) {
        callback(data);
        client.end();
    })
};



