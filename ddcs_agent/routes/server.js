/**
 * Created by Administrator on 2017/5/8.
 */
var net = require("net");
var siteOper = require("./siteOper");

var server;

var server = net.createServer();
server.listen("5656",function () {
    console.log("listening")
});

server.on("connection",function (socket) {
    console.log("服务器与客户端已连接");
    socket.write(socket.remoteAddress)
    // console.log("serverAddress===host:"+socket.localAddress+"port"+socket.localPort)
    // socket.setEncoding("utf-8");
    // var addr = socket.remoteAddress;
    // var port = socket.remotePort;
    // console.log("address:" + addr + ",port:" + port);
    socket.on("data",function (data) {
        console.log("接受到客户端数据："+data);
        socket.write(true)
    });
    socket.on("error",function (err) {
        console.log(err)
    })
});
