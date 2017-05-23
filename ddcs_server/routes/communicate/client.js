/**
 * Created by Administrator on 2017/5/14.
 */
var net = require("net");
var serverConfig = require("../../webconfig.json").server;
// var dbOpt = require("../utils/db_conection");
// var _dpOpt = new dbOpt();
var client = function (jsonData,callback) {
    var port = serverConfig.tcpPort;
    var host = jsonData.ip;
    var client = new net.Socket();
    client.connect(port,host,function () {
        client.write(JSON.stringify(jsonData.cmd));
    });
    client.on("data",function (data) {
        callback(JSON.parse(data));
        client.end();
    })
};
exports.client=client;


