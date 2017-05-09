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
    var mainRequest = jsonData.mainRequest;
    var operFunc = userOperFunc[mainRequest];
    var rtRes = {
        rstcode:"error",
        desc:"",
        data:{}
    };
    if(typeof procFunc != "function")
    {
        callback(rtRes);
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

    var rstJson = {
        rstcode:"error",
        desc:"",
        data:""
    };
    jsonData.createtime = api.formatDate(new Date());
    jsonData.lastmodtime = api.formatDate(new Date());
    userDao.getInstance().createUserMgr(jsonData,function (error) {
        if(error)
        {
            console.log("[execSql adduser]:" + error.detail);
            if(error.code == '23505' && error.constraint == 'tbl_user_pkey'){
                rstJson.desc = "该用户已存在！";
            }else{
                rstJson.desc = "添加失败！";
            };
        }
        else
        {
            rstJson.rstcode = "success";
        };
        callback(rstJson);
    })
};
function modifyUser() {
    
};
function deleteUser() {
    
}
