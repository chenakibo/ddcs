/**
 * Created by Administrator on 2017/5/9.
 */
'use strict';
/*
 * author:chenkaibo
 * */
$(function () {

    main();
    $("#register").click(function () {
        $('#register_form').modal()
    });
    $("#submitReg").click(function () {
        register();
        $('#register_form').modal("hide")
    })
});
function main(){
    //清空所有session
    var sessionObj = window.sessionStorage;
    for(var i in sessionObj)
    {
        window.sessionStorage.removeItem(i);
    }
}

/*
 * 注册
 */
function register()
{
    var register_Interface = new registerAjaxInterface();
    var jsonDataObj = {
        request :{"mainRequest":"createUser","subRequest":"","ssubRequest":""},
        "data" :{
            "name":"",
            "pwd":"",
            "email":"",
            "usertype":"",
            "mobile":"",
            "createtime":"",
            "lastmodtime":""
        },
    };
    var username = $("#usernameReg").val();
    var pwd = $("#passwordReg").val();
    var email = $("#email").val();
    var usertype = "1";
    var mobile = $("#mobile").val();

    jsonDataObj.data.name = username;
    jsonDataObj.data.pwd = hex_md5(pwd);
    jsonDataObj.data.email = email;
    jsonDataObj.data.usertype = usertype;
    jsonDataObj.data.mobile = mobile;
    var jsonDataStr = JSON.stringify(jsonDataObj);
    register_Interface.ajaxRequest(false,jsonDataStr,dealWithRegisterData);
}

/*
 * 功能：处理登录数据
 */
function dealWithRegisterData(retJson)
{
    var retjsonStr = JSON.parse(retJson);
    if(retjsonStr.rstcode == "success")
    {
        uxAlert("注册成功！")
    }else{
        uxAlert(retjsonStr.desc);
    }
}
/*
 * 取消
 * */
// function cancel()
// {
//     window.location.replace("/views/siteManager.html");
// }