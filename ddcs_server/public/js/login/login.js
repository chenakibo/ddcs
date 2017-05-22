'use strict';
/*
* author:chenkaibo
* */
$(function () {

    main();
    createCode($("#codeImage"));
    var login_ajaxInterface = new loginAjaxInterface();  //登录请求接口

    $("#register").click(function () {
        $('#register_form').modal()
    });
    $("#submit").click(function () {
        login();
    });

    $("#reset").click(function () {
        reset()
    })
    $("#resetReg").click(function() {
        reset()
    })
    function main(){
        //清空所有session
        var sessionObj = window.sessionStorage;
        for(var i in sessionObj)
        {
            window.sessionStorage.removeItem(i);
        }
    }
    /*
     * 校验验证码
     * */
    function checkCode() {
        if($("#checkcode").val() == ""){
            uxAlert("验证码不能为空！");
            return false;
        }else
        if($("#checkcode").val().toUpperCase() != $("#codeImage").html().toUpperCase()){
            uxAlert("验证码输入错误！");
            return false;
        }else{
            return true;
        }
    }

    /*
     * 登录
     */
    function login()
    {

        /*
         * 首先校验验证码
         * */
        // var flag = checkCode();
        var flag = true;
        if(flag){
            var jsonDataObj = {
                "data" :{"name":"","pwd":""},
                "oper" : "登录系统"
            };
            var username = $("#username").val();
            var pwd = $("#password").val();
            jsonDataObj.data.name = username;
            jsonDataObj.data.pwd = hex_md5(pwd);
            // window.sessionStorage.ux_curUserPwd = pwd;
            var jsonDataStr = JSON.stringify(jsonDataObj);
            login_ajaxInterface.ajaxRequest(false,jsonDataStr,dealWithLoginData);
        }
    }

    /*
     * 功能：处理登录数据
     */
    function dealWithLoginData(retJson)
    {
        var retjsonStr = JSON.parse(retJson);
        if(retjsonStr.rstcode == "success")
        {
            window.sessionStorage.curUserRole = retjsonStr.data.role;//0:管理员，1:普通用户
            window.sessionStorage.curUserName = retjsonStr.data.username; //用户名
            // window.sessionStorage.userHandle = retjsonStr.data.userhandle;//sessionID
            location.href="https://localhost:11111/index";
            // uxAlert("你好："+retjsonStr.data.name)
        }else{
            uxAlert(retjsonStr.desc);
        }
    }

    /*
     * 取消
     * */
    function cancel()
    {
        window.location.replace("/views/index.html");
    };

    function reset() {
        $("input").val("")
    }
})


