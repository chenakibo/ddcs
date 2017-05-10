
var MyDbOpt = require('./../utils/db_conection');
var ux_config = require('../../webconfig').webserver;
var gTimeoutSec = ux_config.timeout/1000;
var onlineMgr = (function()
{
    var _inst;
    function OnlineCtrl()
    {
        var _dbOpt = new MyDbOpt();
        // 判断指定用户是否在线
        function _isOnline(user,callback)
        {
            if(typeof callback !== 'function')
            {
                return;
            }
            var sql = 'SELECT * FROM tbl_onlineuser WHERE username = $1;';
            var value = new Array();
            value.push(user.name);
            _dbOpt.querySql(sql,value,function(err,rowCount,rst)
            {
                if(err)
                {
                    callback(false);
                    return;
                }
                if(rowCount == 0)
                {
                    callback(false);
                    return;
                }
                if(rowCount == 1)
                {
                    var curtm = Math.floor((new Date().getTime())/1000);
                    var ret = curtm - Number(rst[0].lastopttm);
                    if(ret > gTimeoutSec)
                    {
                        _inst.delOfflineUser(user,function(delrt)
                        {
                            callback(false);
                        });
                        return;
                    }

                }
                callback(true);
            });
        }
        /*
         * 功能：更新在线用户
         * 参数：user 操作站点的用户信息
         * callback(err,rst) err是否发生错误，rst查询结果集
         */
        function _updateOnlineUser(user,callback)
        {
            if(user.length <= 0)
            {
                return 0;
            }
            if(typeof callback != "function")
            {
                return 0;
            }
            var sqlText = "UPDATE tbl_onlineuser SET sessionid = $1 , lastopttm = $2 , optsite = $3 WHERE username = $4;";
            var sqlValue = new Array();
            sqlValue.push(user.id);
            sqlValue.push(user.lastOptTime);
            sqlValue.push(user.optSite);
            sqlValue.push(user.name);
            _dbOpt.execSql(sqlText,sqlValue,function(error)
            {
                if(error)
                {
                    callback(true);
                    return;
                }
                callback(false);
            });

        }

        return{
            /*
             功能：生成在线ID
             参数：无
             返回值：id 会话ID字符串
             */
            buildId:function()
            {
                var date = new Date();
                var tm = date.getTime()/1000;
                var rand = Math.random()*100;
                var sessionId = Math.floor(tm/rand);
                return sessionId.toString();
            },
            /*
             功能：保存在线用户
             参数：user在线用户信息(name role id)
                  callback(rst) rst:true false保存成功\失败
             返回值：无
             */
            regOnlineUser: function(user,callback)
            {
                if(typeof callback !== 'function')
                {
                    return;
                }
                _isOnline(user,function(rst)
                {
                    if(rst)
                    {
                        //在线更新
                        _updateOnlineUser(user,function(error)
                        {
                            if(error)
                            {
                                callback(true);
                            }
                            else
                            {
                                callback(false);
                            }
                        });
                        return;
                    }
                    var sql = "INSERT INTO tbl_onlineuser " +
                        "(sessionid,username,userrole,lastopttm,optsite) VALUES ($1,$2,$3,$4,$5);";
                    var value = new Array();
                    value[0] = user.id;
                    value[1] = user.name;
                    value[2] = user.role;
                    value[3] = user.lastOptTime;
                    value[4] = user.optSite;
                    _dbOpt.execSql(sql,value,function(err)
                    {
                        if(err)
                        {
                            callback(true);
                            return;
                        }
                        callback(false);
                    });
                });

            },
            /*
             功能：删除离线用户
             参数：user离线用户信息(name,role,id)
                  callback(rst) rst:true false成功失败
             返回值：无
             */
            delOfflineUser: function(user,callback)
            {
                if(typeof callback !== 'function')
                {
                    return;
                }
                var sql = "DELETE FROM tbl_onlineuser WHERE username = $1;";
                var value = new Array();
                value.push(user.name);
                _dbOpt.execSql(sql,value,function(error)
                {
                    if(error)
                    {
                        callback(true);
                        return;
                    }
                    callback(false);
                });
            },
            /*
             功能：判断是否有效会话
             参数：user 用户信息(name,role,id)
                  callback(rst)true有效 false 无效
             返回值：
             */
            isValidSession:function(user,callback)
            {
                if(typeof callback !== 'function')
                {
                    return;
                }
                if(user.length <= 0)
                {
                    return;
                }
                var sql = 'SELECT * FROM tbl_onlineuser WHERE username = $1';
                var value = new Array();
                value.push(user.name);
                _dbOpt.querySql(sql,value,function(err,rowCount,rst)
                {
                    if(err)
                    {
                        callback(false);
                        return;
                    }
                    if(rowCount != 1)
                    {
                        callback(false);
                        return;
                    }
                    if(rowCount == 1)
                    {
                        if(user.id != rst[0].sessionid)
                        {
                            callback(false);
                            return;
                        }
                        //默认10分钟超时
                        var timeoutValue = Number(rst[0].lastopttm) + gTimeoutSec;
                        var curTimeValue = Number(user.lastOptTime);
                        if(curTimeValue > timeoutValue)
                        {
                            callback(false);
                            return;
                        }
                    }

                    callback(true);
                });

            },
            /*
             * 功能：更新最后操作时间
             *参数：user 操作站点的用户信息
             * callback(error) false--没有错误，更新成功，true--有错误，更新失败
             *
             */
            updateLastOptTime: function(user,callback)
            {
                if(user.length <= 0)
                {
                    return 0;
                }
                if(typeof callback != "function")
                {
                    return 0;
                }
                var sqlText = "UPDATE tbl_onlineuser SET  lastopttm = $1  WHERE username = $2;";
                var sqlValue = new Array();
                sqlValue.push(user.lastOptTime);
                sqlValue.push(user.name);
                _dbOpt.execSql(sqlText,sqlValue,function(error)
                {
                    if(error)
                    {
                        callback(true);
                        return;
                    }
                    callback(false);
                });

            },
            /*
             功能：判断是否在线
             参数：user 用户信息(name,role)
                  callback(rst) true在线 false离线
             返回值：
             */
            isOnline:function(user,callback)
            {
                if(typeof callback !== 'function')
                {
                    return;
                }
                _isOnline(user,function(rst)
                {
                    callback(rst);
                });
            },

            /*
            * 功能：判断主机是否可被连接，同一角色不能连用一个主机
            *参数：user.role用户角色,user.optSite操作主机地址
            * callback(rst) true允许被连接，false不允许被连接
            */
            siteCanbeConnect:function(user,callback)
            {
                if(typeof callback !== 'function')
                {
                    return;
                }
                var sql = "SELECT * FROM tbl_onlineuser WHERE optsite = $1 AND userrole = $2 AND username <> $3 or username IS NULL;";
                var value = new Array();
                value.push(user.optSite);
                value.push(user.role);
                value.push(user.name);
                _dbOpt.querySql(sql,value,function(err,rowCount,rst)
                {
                    if(err)
                    {
                        callback(true);
                        return;
                    }
                    if(rowCount == 0)
                    {
                        callback(true);
                        return;
                    }
                    if(rowCount == 1)
                    {
                        user.name = rst[0].username;
                        _isOnline(user,function(bOnline)
                        {
                            if(!bOnline)
                            {
                                callback(true);
                            }
                            else
                            {
                                callback(false);
                            }
                        });
                        return;
                    }
                    callback(false);
                });
            },
            /*
             * 功能：更新站点连接状态
             *参数：user 操作站点的用户信息
             * callback(err,rst) err是否发生错误，rst查询结果集
             *
             */
            updateSiteConnect:function(user,callback)
            {
                if(typeof callback !== "function")
                {
                    return 0;
                }
                if(user.name == "")
                {
                    return 0;
                }
                var sqlText = "UPDATE tbl_onlineuser SET optsite = $1 WHERE username = $2;";
                var sqlValue = new Array();
                sqlValue.push(user.optSite);
                sqlValue.push(user.name);
                _dbOpt.execSql(sqlText,sqlValue,function(error)
                {
                    if(error)
                    {
                        callback(true);
                        return;
                    }
                    callback(false);
                });
            },
            /*
             * 功能：判断站点是否可以修改，修改 删除
             *参数：user 操作站点的用户信息，操作站点信息
             * callback(bAllowed) bAllowed --true允许修改，false--不允许。
             *
             */
            siteCanbeMod:function(user,callback)
            {
                if(typeof callback !== "function")
                {
                    return 0;
                }
                if(user.optSite == "")
                {
                    return 0;
                }
                var curtm = Math.floor((new Date().getTime())/1000);
                var validTime = curtm - gTimeoutSec;
                var sqlText = "SELECT * FROM tbl_onlineuser WHERE optsite = $1 AND lastopttm > $2;";
                var sqlValue = new Array();
                sqlValue.push(user.optSite);
                sqlValue.push(validTime.toString());
                _dbOpt.querySql(sqlText,sqlValue,function(err,rowCount,rst)
                {
                    if(err)
                    {
                        callback(true);
                        return;
                    }
                    if(rowCount == 0)
                    {
                        callback(true);
                        return;
                    }
                    if(rowCount > 0)
                    {
                        callback(false);
                        return;
                    }
                    callback(true);
                });
            },

            /*
             * 功能：获取所有有效的在线控制信息
             *参数：user 操作站点的用户信息，操作站点信息
             * callback(err,rst) err --错误信息，rst--查询集。
             *
             */
            getAllValidOnlineInfo:function(callback)
            {
                if(typeof callback !== "function")
                {
                    return 0;
                }
                var curtm = Math.floor((new Date().getTime())/1000);
                var validTime = curtm - gTimeoutSec;
                var sqlText = "SELECT * FROM tbl_onlineuser WHERE lastopttm > $1 AND optsite <> $2 or optsite IS NULL;";
                //var sqlText = "SELECT * FROM tbl_onlineuser WHERE lastopttm > "+validTime.toString()+";";
                var sqlValue = new Array();
                sqlValue.push(validTime.toString());
                sqlValue.push("");
                _dbOpt.querySql(sqlText,sqlValue,function(err,rowCount,rst)
                {
                    callback(err,rowCount,rst);
                });
            }

        }

    }
    return{
        getInstance:function()
        {
            if(_inst === undefined)
            {
                _inst = new OnlineCtrl();
            }
            return _inst;
        }
    }
})();

module.exports = onlineMgr;