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
    var register_Interface = new registerAjaxInterface();  //登录请求接口
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
    var username = $("#username").val();
    var pwd = $("#password").val();
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
        uxAlert("您输入的信息有误，请重新输入！");
    }
}
/*
 * 取消
 * */
function cancel()
{
    window.location.replace("/views/siteManager.html");
}