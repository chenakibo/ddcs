/**
 * Created by Administrator on 2017/5/8.
 */
var net = require("net");
var siteOper = require("./siteOper");
var triggerFunc = require("./cmdtrigger");

var server;

var server = net.createServer();
server.listen("5656",function () {
    console.log("listening")
});

server.on("connection",function (socket) {
    console.log("服务器与客户端已连接");
    // console.log("serverAddress===host:"+socket.localAddress+"port"+socket.localPort)
    // socket.setEncoding("utf-8");
    // var addr = socket.remoteAddress;
    // var port = socket.remotePort;
    // console.log("address:" + addr + ",port:" + port);
    socket.on("data",function (data) {
        // console.log("data:"+JSON.parse(data))
        triggerFunc.triggerFunction(JSON.parse(data),function (err,rst) {
            if(err){
                return
            }else {
                // console.log("rst:"+JSON.stringify(rst))
                socket.write(JSON.stringify(rst));
            }
        })
    });
    socket.on("error",function (err) {
        console.log(err)
    })
});
