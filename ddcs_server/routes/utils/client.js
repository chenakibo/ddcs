/**
 * Created by Administrator on 2017/5/11.
 */
var net = require("net");

var client;

function connect(jsonData,callback) {

    if(typeof callback != "function"){
        return;
    }

    if(client == undefined){
        client = new net.Socket();
    };
    /*
    * 连接到主机
    * */
    client.connect(jsonData.port,jsonData.ip,function () {
        client.write(jsonData.data);
    });

    client.on('end', function ()
    {
        client.destroy();
        console.log('disconn.');
    });
    client.on('data',function(data)
    {
        // client.setTimeout(15000);
       callback(data);
       client.end();
    });
    client.on('timeout',function()
    {
        console.log('timeout.');
        client.end();

    });
    client.on('error',function(err)
    {
        callback(err);
        client.end();
    });
};

var jsonData = {
    ip:"localhost",
    port:"5656",
    data:"客户端发送的数据"
}

if(1){
    connect(jsonData)
}