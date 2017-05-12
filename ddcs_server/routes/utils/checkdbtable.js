var fs = require('fs');
var myDbOpt = require('./db_conection');
var curIndex = 0;
var _dbOpt;
var dbDir = '../dbsql';
var fileNameList = [];
var checkdbTableCallFunc;
function checkdbTable(callback)
{
    if(typeof checkdbTableCallFunc !== "function"){
        checkdbTableCallFunc = callback;
    }
    curIndex = 0;
    if(_dbOpt === undefined)
    {
        _dbOpt = new myDbOpt();
    }
    fileNameList = fs.readdirSync(dbDir);
    checkOneTable(fileNameList[curIndex]);
}

function checkOneTable(tbFile)
{
    if(tbFile == "")
    {
        checkdbTableCallFunc(true);
        return;
    }
    var tbName = tbFile.substr(0,tbFile.length - 4);
    var text = "select count(*) from ux_class where relname = \'"+tbName+"\' ";
    _dbOpt.querySql(text,[],checkExist);
}


function checkExist(error,regcount,rst)
{
    if(!error)
    {
        var tableCount = Number(rst[0].count);
        if(tableCount <= 0)
        {
            createTable(fileNameList[curIndex]);
            return;
        }
    }

    curIndex++;
    if(curIndex >= fileNameList.length)
    {
        checkdbTableCallFunc(false);
        fileNameList = [];
        checkdbTableCallFunc = undefined;
        return;
    }
    checkOneTable(fileNameList[curIndex]);

}

function createTable(tbName)
{
    if(tbName == "")
    {
        return;
    }
    var sqlfile = dbDir+"/"+tbName;
    var data = fs.readFileSync(sqlfile,"utf-8");
    data = data.replace(/([\n\r])/g,'');
    _dbOpt.execSql(data,[],function(error)
    {
        if(error)
        {
            console.log("Table \""+fileNameList[curIndex]+"\" create failed!");
        }
        curIndex++;
        if(curIndex >= fileNameList.length)
        {
            checkdbTableCallFunc(false);
            return;
        }
        checkOneTable(fileNameList[curIndex]);
    });
}

exports.checkdbTable = checkdbTable;