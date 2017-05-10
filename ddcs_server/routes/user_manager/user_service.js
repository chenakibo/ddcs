/**
 * Created by Administrator on 2017/5/8.
 */
/*
* 处理用户操作的service
* */
var dbOpt = require("../utils/db_conection");
var userDao = require("./user_dao");
var api = require("../utils/api");

/*
* 用于用户操作处理的函数
* */
var userOperFunc = {
    createUser : createUser,
    modifyUser : modifyUser,
    deleteUser : deleteUser
};
function triggerFunction(jsonData,callback) {
    if (typeof callback != "function"){
        return;
    }
    var mainRequest = jsonData.request.mainRequest;
    var operFunc = userOperFunc[mainRequest];
    var rtRes = {
        rstcode:"error",
        desc:"",
        data:{}
    };
    if(typeof operFunc != "function")
    {
        callback(JSON.stringify(rtRes));
    }
    else
    {
        operFunc(jsonData,callback);
    }
}
exports.triggerFunction = triggerFunction;

function createUser(jsonData,callback) {
    if (typeof callback != "function"){
        return;
    };

    var rtRes = {
        rstcode:"error",
        desc:"",
        data:""
    };
    jsonData.data.createtime = api.formatDate(new Date());
    jsonData.data.lastmodtime = api.formatDate(new Date());
    var dataInfo = jsonData.data;
    userDao.getInstance().createUserMgr(dataInfo,function (error) {
        if(error)
        {
            console.log("[execSql adduser]:" + error.detail+"--errorCode:"+error.code+":errorConstraint:"+error.constraint);
            if(error.code == '23505' && error.constraint == 'tbl_user_pkey'){
                rtRes.desc = "该用户已存在！";
            }else{
                rtRes.desc = "添加失败！";
            };
            callback(JSON.stringify(rtRes));
        }
        else
        {
            rtRes.rstcode = "success";
            callback(JSON.stringify(rtRes));
        };
    })
};
function modifyUser() {
    
};
function deleteUser() {
    
}
