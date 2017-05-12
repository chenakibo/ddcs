/**
 * Created by Administrator on 2017/5/11.
 */
var errList =
    [
        {errno:0,desc:'connect failed.'},
        {errno:1,desc:'connect timeout.'},
        {errno:2,desc:'socket error unknow.'},
        {errno:3,desc:'sever disconnect.'}
    ];
var gNet = require('net');
var gApi = require('./api');

// 主机通讯模块
var HostAccess = function()
{
    var _client;
    var _revFun;
    var _connCbFun;
    var _revDb = null;      // 数据接收全局变量
    //判断TCP是否是client主动断开
    var _disconnected = false;
    /*
     功能：处理接收到的数据（可能会包括多个包）
     参数：无
     返回值：无
     */
    function procRevDb()
    {
        var db;
        if(null == _revDb)
        {
            return null;
        }
        var tmpBuf = _revDb.slice(0,8);
        //var tmpAry = new Array();
        for(var i = 0;i < tmpBuf.length;i++)
        {
            if(0 == tmpBuf[i])
            {
                break;
            }
        }
        tmpBuf = _revDb.slice(0,i);
        var str = tmpBuf.toString();
        var len = Number(str);
        if(_revDb.length >= len + 8)
        {
            db = _revDb.slice(0,len + 8);
            _revFun(null,db);
            if(db.length == _revDb.length)
            {
                _revDb = null;
            }
            else
            {
                tmpBuf = _revDb.slice(db.length,_revDb.length);
                _revDb = tmpBuf;
                procRevDb();
            }
        }
    }
    /*
     功能：根据ip和port连接到指定主机
     参数：ip 主机地址 port 主机端口 callback(err)
     返回值：无
     */
    this.connect = function(ip,port,callback)
    {
        if(typeof callback !== 'function')
        {
            return;
        }
        _connCbFun = callback;
        if(_client === undefined)
        {
            _client = new gNet.Socket();
        };
        /*
        * 连接主机
        * */
        _client.connect(port,ip,function()
        {
            console.log('connect to %s,port = %d',ip,port);
            _client.setTimeout(15000);
            callback(null);
        });
        /*
        * 监听事件
        * */
        _client.on('end', function ()
        {
            _client.destroy();
            _revDb = null;
            console.log('disconn.');
            if(!_disconnected)
            {
                //sever disconnect !!!
                if(typeof _revFun === 'function')
                {
                    _revFun(errList[3],null);
                    _revFun = undefined;
                }
            }
        });
        _client.on('data',function(data)
        {
            // _client.setTimeout(15000);
            console.log('_revFun is',typeof _revFun);
            if(typeof _revFun !== 'function')
            {
                console.log('[hostaccess] _revFun is not function.');
                return;
            }
            if(null == _revDb)
            {
                _revDb = data;
            }
            else
            {
                var tmpBuf = _revDb;
                var ary = new Array();
                ary.push(tmpBuf);
                ary.push(data);
                _revDb = Buffer.concat(ary);
            }
            procRevDb();
            //_revFun(null,db);
        });
        _client.on('timeout',function()
        {
            console.log('timeout.');
            if(typeof _revFun === 'function')
            {
                _revFun(errList[1],null);
                _revFun = undefined;
            }

            _disconnected = true;
            _client.end();

        });
        _client.on('error',function(err)
        {
            var error = errList[2];
            if(err.errno == 'ECONNREFUSED' || err.errno == 'ETIMEDOUT' || err.errno =='ENETUNREACH')
            {
                error = errList[0];
            }
            if(typeof _connCbFun === 'function')
            {
                _connCbFun(error);
                _connCbFun = undefined;
            }
            //console.log(err);
        });
    }

    /*
     功能：断开连接
     参数：无
     返回值：无
     */
    this.disConnect = function ()
    {
        //console.log('[hostaccess] _client is ',_client);
        if(_client === undefined)
        {
            return;
        }
        _disconnected = true;
        _client.end();
    }
    /*
     功能：发送同步数据
     参数：req 请求数据 revFun(err,data) 接收函数
     返回值：无
     */
    this.sendSync = function(req,revFun)
    {
        if(typeof revFun !== 'function')
        {
            return;
        }
        if(_client === undefined)
        {
            return;
        }
        if(_revFun === 'function')
        {
            return;
        }
        _revFun = revFun;
        console.log('[hostaccess] sendSync _revFun is ',typeof _revFun);
        _client.write(req);
    }
    /*
     功能：发送异步数据
     参数：req 请求数据
     返回值：无
     */
    this.sendAsyn = function(req)
    {
        if(_client === undefined)
        {
            return;
        }
        _client.write(req);
    }
};
if(1){
    new HostAccess().connect("5656","192.168.1.36",function () {
        
    })
}
module.exports = HostAccess;
