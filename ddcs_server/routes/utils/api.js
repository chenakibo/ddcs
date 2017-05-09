var buffer = require("buffer").Buffer;
var crypto = require("crypto");
exports.getmd5 = getmd5;
 /**
02
 * 获取字符串的哈希值
03
 * @param {String} str
04
 * @param {Boolean} caseSensitive
05
 * @return {Number} hashCode
06
 */

function getmd5(str,caseSensitive){

    if(!caseSensitive){

        str = str.toLowerCase();

    }
    // 1315423911=b'1001110011001111100011010100111'
    var hash  =   1315423911;
	
	var ch = 0;
  
    for (var i = 0; i < str.length+1; i++) 
	{

        ch = str.charCodeAt(i);
        hash ^= ((hash << 5) + ch + (hash >>> 2));
		
    }
    hash >>>=0;
    return  (hash);
}

exports.getSecureCookies = function()
{
    return "this is a secure of uxdb";
}

exports.creatVerificationCode = function()
{
    var date = new Date();
    var tm = date.getTime()/1000;
    var rand = Math.random()*100;
    var code = Math.floor(tm/rand).toString();
    if(code.length < 6)
    {
        code += "654321";
    }
    return code.slice(0,6);
}

exports.writeToFile = function(filename,filecontent,callbackfunc)
{
    if((filename == "") || ( typeof callbackfunc != "function"))
    {
        return;
    }

    var rtRes = {
        rstcode:"success",
        desc:"",
        data:{}
    };
    try
    {
        var fs = require('fs');
        fs.writeFileSync(filename, filecontent);
    }
    catch (err)
    {
        console.log('error writing:' + err.message);
        rtRes.rstcode = "error";
        rtRes.desc  = err.message;
    }
    rtRes.data.filename = filename;
    callbackfunc(rtRes);
};


exports.deleteFile = function (filename)
{
    if(typeof filename != "string" || filename.length <= 0)
    {
        console.log("file error");
        return;
    }
    try
    {
        var fs = require('fs');
        fs.unlinkSync(filename);
    }
    catch(err)
    {
        console.log("del file error :"+err.message);
    }

};

exports.readFromFile = function (filename)
{
    if(typeof filename != "string" || filename.length <= 0)
    {
        console.log("file error");
        return;
    }
    var fileDataStr = "";
    try
    {
        var fs = require('fs');
        fileDataStr =  fs.readFileSync(filename);
    }
    catch(err)
    {
        return "";
    }
    return fileDataStr;
};

//加密
exports.encrypt  = function(str,secret) {
    var enc = "";
    try
    {
        var crypto = require('crypto');
        var cipher = crypto.createCipher('aes192', secret);
        enc = cipher.update(str,'utf8','hex');
        enc += cipher.final('hex');
    }
    catch(err)
    {
        console.log(err.message);
        return "";
    }
    return enc;
};
//解密
exports.decrypt  = function (str,secret) {
    var dec = "";
    try
    {
        var crypto = require('crypto');
        var decipher = crypto.createDecipher('aes192', secret);
        dec = decipher.update(str,'hex','utf8');
        dec += decipher.final('utf8');
    }
    catch(err)
    {
        console.log(err.message);
        return "";
    }

    return dec;
};
exports.createmd5 = function(data){
    var buf = new buffer(data);
    var str = buf.toString("binary");
    return crypto.createHash("md5").update(str).digest("hex");
}
exports.formatDate = function(date){
    if(typeof date != "object"){
        return "";
    }
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var dates = date.getDate();
    var hours = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    month = month < 10 ? ("0" + month) : month;
    dates = dates < 10 ? ("0" + dates) : dates;
    hours = hours < 10 ? ("0" + hours) : hours;
    minute = minute < 10 ? ("0" + minute) : minute;
    second = second < 10 ? ("0" + second) : second;

    return year + "-" + month + "-" + dates + " " + hours + ":" + minute + ":" + second;
}

//unit test
if(0){ //test getMd5
    var md5 = this.createmd5("myinstancename0/opt/mypathsffsdf");
    console.log("md5:"+md5);
}