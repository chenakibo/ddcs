/**
 * Created by Administrator on 2017/5/16.
 */
/*
 功能：按照协议格式组包站点连接数据域
 参数：reqJson
 返回值：数据域协议格式数据
 */
exports.packDbField = function(reqJson)
{
    var buf = packDataField(reqJson);
    return buf;
}
// 解包，返回json格式
exports.unPackDbField = function(head,resDb)
{
    var resJson = {
        'finish':false,
        'data':[]
    }
    if(head.nextFlag == 0)
    {
        resJson.finish = true;  //得到完成标记
    }

    var dbField = unPackDataField(head,resDb);    // 得到数据域
    resJson.maincmd = dbField.maincmd;
    resJson.subcmd = dbField.subcmd;
    //resJson.ssubcmd = dbField.ssubcmd;
    resJson.data = dbField.data;

    return resJson;
}

/*
 功能：将数据以json格式打包进数据域
 参数：reqJson
 返回值：数据域协议格式数据
 */
function packDataField(reqJson)
{
    console.log("-------------------send json:"+JSON.stringify(reqJson)+"------------------");
    var buf;
    var dataJsonStr = JSON.stringify(reqJson.data);
    var bufData = new Buffer(dataJsonStr);
    var bufTmp = new Buffer(bufData.length + 10);
    bufTmp.fill(0);
    var offset = 0;
    //命令
    bufTmp.writeUInt16BE(reqJson.maincmd,offset);
    offset = offset + 2;
    bufTmp.writeUInt16BE(reqJson.subcmd,offset);
    offset = offset + 2;
    //bufTmp.writeUInt16BE(reqJson.ssubcmd,offset);
    //offset = offset + 2;
    bufTmp.writeUInt16BE(reqJson.dbnum,offset);
    offset = offset + 2;
    //json格式的data数据
    bufData.copy(bufTmp,offset,0,bufData.length);
    offset += bufData.length;
    buf = bufTmp.slice(0,offset);
    return buf;
}
// 解包，返回json格式
function unPackDataField(head,resDb)
{
    var dbField =
        {
            'maincmd':-1,
            'subcmd':-1,
            //'ssubcmd':-1,
            'dbnum':-1,
            'data':[]
        };
    var offset = 62;    // 协议头的长度
    var dbBuf = resDb.slice(offset,offset + head.dataSize);
    var index = 0;
    //命令
    if(!head.BLflag)
    {
        dbField.maincmd = dbBuf.readUInt16LE(index);
        index = index + 2;
        dbField.subcmd = dbBuf.readUInt16LE(index);
        index = index + 2;
        //dbField.ssubcmd = dbBuf.readUInt16LE(index);
        //index = index + 2;
        dbField.dbnum = dbBuf.readUInt16LE(index);
        index = index + 2;
    }
    else
    {
        dbField.maincmd = dbBuf.readUInt16BE(index);
        index = index + 2;
        dbField.subcmd = dbBuf.readUInt16BE(index);
        index = index + 2;
        //dbField.ssubcmd = dbBuf.readUInt16BE(index);
        //index = index + 2;
        dbField.dbnum = dbBuf.readUInt16BE(index);
        index = index + 2;
    }
    //data数据
    var bufData = dbBuf.slice(index,dbBuf.length);
    var strTmp = bufData.toString();
    //console.log("data:"+strTmp);
    dbField.data = JSON.parse(strTmp);
    console.log("-------------------receive data:"+JSON.stringify(dbField)+"------------------");
    return dbField;
}

//unit test
if(0){
    var reqJson = {
        maincmd:1,
        subcmd:2,
        //ssubcmd:3,
        dbnum:4
    }
    reqJson.data = {
        id:1,
        name:"xiaoming",
        age:24,
        desc:0
    }
    var packBuf = packDataField(reqJson); //pack
    console.log("packBuf:"+packBuf);

    var unbuf = new Buffer(packBuf.length + 62);
    var head = {
        BLflag:1,
        dataSize:0,
        nextFlag:0
    }
    unbuf.fill(0);
    packBuf.copy(unbuf,62,0,packBuf.length);
    head.dataSize = packBuf.length;
    var str = unPackDataField(head,unbuf); //unpack
    var strTmp = JSON.stringify(str);
    console.log("unpackStr:  "+strTmp);
}