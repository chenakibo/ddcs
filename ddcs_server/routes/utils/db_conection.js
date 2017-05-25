/**
 * Created by Administrator on 2017/5/8.
 */
var pg = require('pg');
var gPrivatePwd = "hn5sFyvrgH";
var uxdbConfig = require('./../../webconfig.json').uxdb;
var gPrivatePort = "5432";
var dbConfig = {
    user: uxdbConfig.username,
    database: uxdbConfig.dbname,
    password: 'hn5sFyvrgH',
    host: uxdbConfig.servername,
    port: uxdbConfig.port,
    poolSize: uxdbConfig.poolSize,
    poolIdleTimeout: uxdbConfig.poolIdleTimeout,
    reapIntervalMillis: uxdbConfig.reapIntervalMillis
}

var dbPool = new pg.Pool(dbConfig);

/*  uxdb数据库操作类 */
function webdbOpt()
{
    this.querySql = querySql;
    this.execSql = execSql;
    this.checkConnect = checkConnect;
    this.connectUxdb = connectUxdb;
    this.createWebdb = createWebdb;
    this.setPrivatePwd = function(pwd)
    {
        gPrivatePwd = pwd;
        this.pwd = pwd;
    };
    this.getPrivatePwd = function()
    {
        return gPrivatePwd;
    };
    this.getPrivatePort = function()
    {
        return gPrivatePort;
    };
}

module.exports = webdbOpt;

// 执行查询SQL语句（异步）
function querySql(sqlText, sqlValue, callback)
{
    if (typeof callback != "function") {
        return;
    }
    dbPool.connect(function(isErr, client, done) {
        if (isErr) {
            callback(isErr);
            return;
        }
        client.query(sqlText, sqlValue, function(isErr, results){
            done();
            if (isErr) {
                callback(isErr);
                console.log("[query_error]:" + isErr);
                return;
            }
            callback(isErr, results.rowCount, results.rows);
        })
    })
}
// 执行非查询类型的SQL语句
function execSql(sqlText, sqlValue, callback)
{
    if (typeof callback != "function") {
        return;
    }
    dbPool.connect(function(isErr, client, done) {
        if (isErr) {
            done();
            callback(isErr);
            return;
        }
        client.query(sqlText, sqlValue, function(isErr, results){
            done();
            if (isErr) {
                console.log("[exec_error]:" + isErr);
            }
            callback(isErr);
        })
    })
}
//数据库连接检测
function checkConnect(callback)
{
    dbPool.connect(function(isErr, client, done){
        done();
        callback(isErr);
    });
}

function connectUxdb(callback){
    if (typeof callback != "function") {
        return;
    }
    var dbname = "uxdb";
    var conStr = "uxdb://" + dbConfig.user + ":" + dbConfig.password + "@" + dbConfig.host + ":" + dbConfig.port + "/" + dbname;
    var client = new pg.Client(conStr);
    client.connect(function(isErr) {
        callback(isErr);
        client.end();
    })
}
function createWebdb(callback){
    if (typeof callback != "function") {
        return;
    }
    var dbname = "uxdb";
    var conStr = "uxdb://" + dbConfig.user + ":" + dbConfig.password + "@" + dbConfig.host + ":" + dbConfig.port + "/" + dbname;
    var client = new pg.Client(conStr);
    client.connect(function(isErr,client,done) {
        if (isErr) {
            callback(isErr);
            client.end();
        } else {
            var sqlText = "CREATE DATABASE " + dbConfig.database + " OWNER = " + dbConfig.user + ";";
            var sqlValue = [];
            client.query(sqlText, sqlValue, function (isErr, rst) {
                callback(isErr);
                client.end();
            })
        }
    })
}
function deleteAllDataOfTables(){
    var dbOpt = new webdbOpt();

    var sqlText = "";
    var sqlValue = [];

    var tables = ["tbl_site","tbl_user","tbl_hostinfo","tbl_hostconfig",];

    for(var i=0;i<tables.length;i++){
        sqlText = "drop table " + tables[i] + ";"
        dbOpt.execSql(sqlText,sqlValue,function(isErr){if(isErr){console.log("delete error!");}});
    }
}
// deleteAllDataOfTables();
// if(1){
//     var sql = "select * from tbl_user;"
//     var value = [];
//     querySql(sql,value,function (err,count,ret) {
//         console.log(ret)
//     })
// }