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
        var agentData = JSON.parse(data);
        checkAgent(agentData.hostConfig,function (rst) {
            socket.write(JSON.stringify(rst));
        });
        checkSite(agentData.siteInfo,function (rst) {
            socket.write(JSON.stringify(rst));
        });
    })
});
/*
 * 查询数据库中是否有这这个agent
 * */
function checkAgent(rstJsonData,callback) {
    if (typeof callback != "function"){
        return;
    };
    var sqlText = "select * from tbl_hostconfig where ip = $1;";
    var sqlValue = [rstJsonData.ip];
    _dpOpt.querySql(sqlText,sqlValue,function (err,count,rst) {
        if(err){
            callback(err);
            return;
        };
        if(count == 0 || rst.length == 0){
            var sql = "insert into tbl_hostconfig(hostname,platform,arch,ip,cpuInfo,cpuNumber,totalMem) values($1,$2,$3,$4,$5,$6,$7);";
            var value = [
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
            var sql = "update tbl_hostconfig set hostname=$1,platform=$2,arch=$3,ip=$4,cpuInfo=$5,cpuNumber=$6,totalMem=$7 where ip=$8;";
            var value = [
                rstJsonData.hostname,
                rstJsonData.platform,
                rstJsonData.arch,
                rstJsonData.ip,
                rstJsonData.cpuInfo,
                rstJsonData.cpuNumber,
                rstJsonData.totalMem,
                rstJsonData.ip
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
            var sql = "update tbl_hostconfig set id=$1,sitename=$2,ip=$3,port=$4,state=$5 where ip=$6;";
            var value = [
                rstJsonData.id,
                rstJsonData.hostname,
                rstJsonData.ip,
                rstJsonData.port,
                rstJsonData.state,
                rstJsonData.ip,
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