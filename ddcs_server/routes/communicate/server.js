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
var config = require("../../webconfig.json").server

var server = net.createServer();
server.listen("7878",function () {
    console.log("webserver listen on 7878!")
});
server.on("connection",function (socket) {
    socket.on("data",function (data) {
        console.log("data:"+data)
        var agentData = JSON.parse(data);
        if(agentData.cmd == "getInfo"){
            console.log("agentData.cmd"+agentData.cmd)
            checkAgent(agentData.hostConfig,function (rst) {
                if(rst){
                    checkSite(agentData.siteInfo,function (rst) {
                        socket.write(JSON.stringify(rst));
                    });
                }
            });
        };
        if(agentData.cmd == "updateModTime"){
            updateModTime(agentData.time);
        }
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
            var sql = "insert into tbl_site(id,sitename,ip,port,state,lastmodtime) values($1,$2,$3,$4,$5,$6);";
            var value = [
                rstJsonData.id,
                rstJsonData.name,
                rstJsonData.ip,
                rstJsonData.port,
                rstJsonData.state,
                rstJsonData.lastmodtime
            ];
            _dpOpt.execSql(sql,value,function (err) {
                if(err){
                    callback(err)
                    return;
                };
                callback(true);
            })
        }else {
            var sql = "update tbl_site set id=$1,sitename=$2,ip=$3,port=$4,state=$5,lastmodtime=$6 where id=$7;";
            var value = [
                rstJsonData.id,
                rstJsonData.name,
                rstJsonData.ip,
                rstJsonData.port,
                rstJsonData.state,
                rstJsonData.lastmodtime,
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
*检查agent状态
**/
checkAgentState();
function checkAgentState() {
    var sqlText = "select ip from tbl_site;";
    _dpOpt.querySql(sqlText,[],function (err,count,rst) {
        console.log(JSON.stringify(rst))
        for(var item in rst){
            // var socket = new net.Socket()
            // socket.connect("5656",rst[item].ip,function () {
            //     updateAgentState(rst[item].ip,"1");
            //         socket.end()
            // });
            // socket.on("error",function (err) {
            //     if(err.code != "ECONNREFUSED"){
            //         updateAgentState(rst[item].ip,"2");
            //     }
            // })
            // console.log("item:"+rst[item].ip)
            var ip = rst[item].ip;
            var sqlText = "select lastmodtime from tbl_site where ip = $1;";
            var sqlValue = [ip];
            _dpOpt.querySql(sqlText,sqlValue,function (err,count,rst) {
                // console.log("rst:"+rst[0].lastmodtime)
                var currTime = new Date().getTime();
                if(currTime - rst[0].lastmodtime>config.timeout){
                    updateAgentState(ip,"2")
                }
            })
        }
    });
    setTimeout(function () {
        checkAgentState();
    },3000)
};
function updateAgentState(ip,state) {
    var sqlText = "update tbl_site set state = $1 where ip = $2;";
    var sqlValue = [state,ip];
    // console.log(sqlValue)

    _dpOpt.execSql(sqlText,sqlValue,function (err) {
        // console.log("sql:"+sqlText)
        return
    })
};
function updateModTime(time) {
    sqlText = "update tbl_site set lastmodtime = $1";
    sqlValue = [time];
    _dpOpt.execSql(sqlText,sqlValue,function (err) {
        return
    })
}