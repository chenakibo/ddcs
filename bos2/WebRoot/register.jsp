<%@ page language="java" import="java.util.*" contentType="text/html; charset=utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>注册页面</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
  <style type="text/css">
    *{
        margin: 0;
        padding: 0;
        font-family: 宋体;
    }
    .top{
        height: 50px;
        background-color: #eeeeee;
    }
    .middle{
        overflow: hidden;
    }
    .form{
        width: 300px;
        margin: 0 auto;
        color: #484848;
        padding: 30px;
        margin-top: 30px;
        border-color: #4182a8;
    }
    table{
        width: 100%;
        overflow: hidden;
    }
    #username,#password,#birthday,#salary,#telephone,#gender,#station{
        width: 200px;
        height: 25px;
        line-height: 25px;
        margin-top: 3px;
    }
    #reset,#submit{
        display: inline-block;
        width: 70px;
        height: 25px;
        font-size: 20px;
        margin-left: 50px;
        border: 1px solid #aeaeb1;
        background-color: #eeeeee;
        text-align: center;
        padding-top: 5px;
        border-radius: 5px;
        cursor: pointer;
        margin-top: 10px;
    }
    .error{
       color:red;
    }
    .successPlace{
       color:#0B940D;
    }
</style>
<script type="text/javascript">
    window.onload=function () {
        forReAndSub();
    };
    function forReAndSub() {
        var re=document.getElementById("reset"),
                sub=document.getElementById("submit"),
                form=document.getElementById("f");
        re.onclick=function () {
            mousedownAndup($(this),"pink");
            form.reset();
        };
        sub.onclick=function () {
            mousedownAndup($(this),"pink");
            form.submit();
        };
    }
</script> 
<script type="text/javascript" src="<%=basePath %>/js/jquery-1.8.3.js"></script>
<script type="text/javascript" src="<%=basePath %>js/validate/jquery.validate.js"></script>
<script>
    $(function () {
        $("#f").validate({
            rules:{
                username:{
                    required:true,
                    rangelength:[6,10]
                },
                password:{
                    required:true,
                    rangelength:[6,16]
                },
                salary:{
                    number:true,
                },
                birthday:{
                    required:true,
                    dateISO:true
                },
                gender:{
                    required:true,
                    sex:true,
                },
                telephone:{
                    required:true,
                    phoneNumber:true
                }
            },
            messages:{
                username:{
                    required:"用户名不能为空",
                    rangelength:"用户名应在6-10位之间"
                },
                password:{
                    required:"密码不能为空",
                    rangelength:"密码应在6-16位之间"
                },
                salary:{
                    number:"请输入数字",
                },
                 birthday:{
                    required:"生日不能为空",
                    dateISO:"输入的生日格式不正确"
                },
                gender:{
                    required:"性别不能为空",
                },
                telephone:{
                    required:"手机号不能为空",
                }
            },
            errorPlacement:function(error,element){
                 if(element.is("#username")){
                      error.appendTo("#error_username");
                 }
                 if(element.is("#password")){
                      error.appendTo("#error_password");
                 }
                  if(element.is("#salary")){
                      error.appendTo("#error_salary");
                 }
                 if(element.is("#birthday")){
                      error.appendTo("#error_birthday");
                 }
                 if(element.is("#telephone")){
                      error.appendTo("#error_telephone");
                 }
                  if(element.is("#gender")){
                      error.appendTo("#error_gender");
                 }
            },
           onfocusout:function (element) {
                    if($(element).valid()){
                        $("#"+element.id+"_successPlace").html("YES");
                        $("#"+element.id+"_successPlace").addClass("successPlace");
                    }
                },
            submitHandler:function(form){
                 form.submit();
            }
        });
        $.validator.addMethod("phoneNumber",function (value,element,param) {
            var reg=/^1[345678]\d{9}$/;
            return this.optional(element)||(reg.test(value));
        },"电话格式不正确");
         $.validator.addMethod("sex",function (value,element,param) {
            var reg= /^['男'|'女']$/;
            return this.optional(element)||(reg.test(value));
        },"性别有误");
    });
      //鼠标按下效果的函数
    function mousedownAndup(obj,down_color) {
        var up_color=obj.css("backgroundColor");
        obj.mousedown(function () {
            $(this).mousedown(function () {
                $(this).css({"backgroundColor":down_color,"box-shadow":"0 0 3px 3px rgb(210,210,210)"});
            });
            $(this).mouseup(function () {
                $(this).css({"backgroundColor":up_color,"box-shadow":"none"});
            });
        });
    }
    function showMessage(mes){
        if(mes!=null){
           alert(mes);
        }
    }
</script> 
 <body>
<div class="top">
    <h1 align="center" style="padding-top: 8px">用户登录</h1>
</div>
<hr color="grey">
<div class="middle">
    <form id="f" action="userAction_register.action" method="post">
        <fieldset class="form">
            <legend style="margin-left: 20px; font-size: 20px; font-weight: bold">登录界面</legend>
            <table cellpadding="3px" style="text-align: center">
                <tr>
                    <td>账号：</td>
                    <td><input type="text" id="username" name="username" placeholder="用户名">
                             <p id="error_username"></p>
                    </td>
                    <td>
                           <span id="username_successPlace"></span>
                    </td>
                </tr>
                <tr>
                    <td>密码：</td>
                    <td><input type="password" id="password" name="password" placeholder="密码">
                           <p id="error_password"></p>
                    </td>
                    <td>
                         <span id="password_successPlace"></span>
                    <td>
                </tr>
                <tr>
                    <td>薪资：</td>
                    <td><input type="text" id="salary" name="salary" placeholder="薪资">
                          <p id="error_salary"></p>
                    </td>
                    <td>
                         <span id="salary_successPlace"></span>
                    <td>
                </tr>
                <tr>
                    <td>生日：</td>
                    <td><input type="text" id="birthday" name="birthday" placeholder="生日">
                           <p id="error_birthday"></p>
                    </td>
                    <td>
                         <span id="birthday_successPlace"></span>
                    <td>
                </tr>
                <tr> 
                    <td>性别：</td>
                    <td><input type="text" id="gender" name="gender" placeholder="性别">
                           <p id="error_gender"></p>
                    </td>
                    <td>
                         <span id="gender_successPlace"></span>
                    <td>
                </tr>
                <tr> 
                    <td>身份：</td>
                    <td><input type="text" id="station" name="station" placeholder="身份">
                    </td>
                </tr>
                <tr>
                    <td>手机：</td>
                    <td><input type="text" id="telephone" name="telephone" placeholder="手机">
                           <p id="error_telephone"></p>
                    </td>
                    <td>
                         <span id="telephone_successPlace"></span>
                    <td>
                </tr>
                <tr>
                    <td>评价：</td>
                    <td><textarea id="remark" name="remark" placeholder="个人评价" style="width:200px;height:80px"></textarea>
                    </td>
                </tr>
            </table>
            <span id="reset">重置</span><span id="submit">提交</span>
        </fieldset>
    </form>
</div>
</body>
</html>