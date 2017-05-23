/**
 * Created by Administrator on 2017/5/8.
 */
var net = require("net");
var siteOper = require("./siteOper");

var client = new net.Socket();
client.connect("7878",function () {
    var agentData = {
        "siteInfo":{},
        "hostConfig":{}
    };
    agentData.siteInfo = siteOper.getSiteInfo();
    agentData.hostConfig = siteOper.getHostConfig();
    // console.log(agentData)
    client.write(JSON.stringify(agentData));
});
client.on("data",function (data) {
    console.log("接收到的服务器的数据："+data);
    if(data == "true"){
        console.log("服务器接受数据成功")
        client.end();
    }
});
client.on("error",function (err) {
    console.log(err)
})