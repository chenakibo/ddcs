/**
 * Created by Administrator on 2017/5/15.
 */
/*
* 监听agent连接的server
* */
var net =require("net");
var dbOpt = require("../utils/db_conection");
var _dpOpt = new dbOpt();
var buffer = require("buffer").Buffer;

var server = net.createServer();
server.listen("7878",function () {
    console.log("webserver listen on 7878!")
});
server.on("connection",function (socket) {
    socket.on("data",function (data) {
        console.log("data:"+data)
        var agentData = JSON.parse(data);
        checkAgent(agentData.hostConfig,function (rst) {
            if(rst){
                checkSite(agentData.siteInfo,function (rst) {
                    socket.write(JSON.stringify(rst));
                });
            }
        });
    });
});
/*
 * 查询数据库中是否有这这个agent
 * */
function checkAgent(rstJsonData,callback) {
    if (typeof callback != "function"){
        return;
    };
    var sqlText = "select * from tbl_hostconfig where id = $1;";
    var sqlValue = [rstJsonData.id];
    _dpOpt.querySql(sqlText,sqlValue,function (err,count,rst) {
        if(err){
            callback(err);
            return;
        };
        if(count == 0 || rst.length == 0){
            var sql = "insert into tbl_hostconfig(id,hostname,platform,arch,ip,cpuInfo,cpuNumber,totalMem) values($1,$2,$3,$4,$5,$6,$7,$8);";
            var value = [
                rstJsonData.id,
                rstJsonData.hostname,
                rstJsonData.platform,
                rstJsonData.arch,
                rstJsonData.ip,
                rstJsonData.cpuInfo,
                rstJsonData.cpuNumber,
                rstJsonData.totalMem
            ];
            _dpOpt.execSql(sql,value,function (err) {
                if(err){
                    callback(err)
                    return;
                };
                callback(true);
            })
        }else {
            var sql = "update tbl_hostconfig set id=$1,hostname=$2,platform=$3,arch=$4,ip=$5,cpuInfo=$6,cpuNumber=$7,totalMem=$8 where id=$9;";
            var value = [
                rstJsonData.id,
                rstJsonData.hostname,
                rstJsonData.platform,
                rstJsonData.arch,
                rstJsonData.ip,
                rstJsonData.cpuInfo,
                rstJsonData.cpuNumber,
                rstJsonData.totalMem,
                rstJsonData.id
            ];
            _dpOpt.execSql(sql,value,function (err) {
                if(err){
                    callback(err)
                    return;
                };
                callback(true);
            })
        }
    })
};

/*
* 检查站点信息
* */
function checkSite(rstJsonData,callback) {
    if (typeof callback != "function"){
        return;
    };
    var sqlText = "select * from tbl_site where ip = $1;";
    var sqlValue = [rstJsonData.ip];
    _dpOpt.querySql(sqlText,sqlValue,function (err,count,rst) {
        if(err){
            callback(err);
            return;
        };
        if(count == 0 || rst.length == 0){
            var sql = "insert into tbl_site(id,sitename,ip,port,state) values($1,$2,$3,$4,$5);";
            var value = [
                rstJsonData.id,
                rstJsonData.name,
                rstJsonData.ip,
                rstJsonData.port,
                rstJsonData.state,
            ];
            _dpOpt.execSql(sql,value,function (err) {
                if(err){
                    callback(err)
                    return;
                };
                callback(true);
            })
        }else {
            var sql = "update tbl_site set id=$1,sitename=$2,ip=$3,port=$4,state=$5 where id=$6;";
            var value = [
                rstJsonData.id,
                rstJsonData.name,
                rstJsonData.ip,
                rstJsonData.port,
                rstJsonData.state,
                rstJsonData.id,
            ];
            _dpOpt.execSql(sql,value,function (err) {
                if(err){
                    callback(err)
                    return;
                };
                callback(true);
            })
        }
    })
};
/*
*检查agent状态
**/
checkAgentState();
function checkAgentState() {
    var sqlText = "select port,ip from tbl_site;";
    _dpOpt.querySql(sqlText,[],function (err,count,rst) {

        for(var item in rst){
            var socket = new net.Socket()
            socket.connect("5656",rst[item].ip,function () {
                // updateAgentState(rst[item].ip);
                //     socket.end()
            });
            socket.on("error",function (err) {
                if(err.code != "ECONNREFUSED"){
                    updateAgentState(rst[item].ip);
                }
            })
        }
    });
    setTimeout(function () {
        checkAgentState();
    },30000)
};
function updateAgentState(ip) {
    var sqlText = "update tbl_site set state = $1 where ip = $2;";
    var sqlValue = ["2",ip];
    _dpOpt.execSql(sqlText,sqlValue,function (err) {
    })
};