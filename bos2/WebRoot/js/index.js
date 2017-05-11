$(function () {
    //为修改密码的确定按钮绑定事件
	$("#btnCancel").click(function(){
		$("#editPwdWindow").window("close");
	});
    $("#btnEp").click(function () {
       //对两次输入的密码进行判断
        var password=$("#txtNewPass").val();
        var rePassword=$("#txtRePass").val();
        if(password==rePassword){
            //若两次输入的密码相同，发送ajax请求
            var url="userAction_editPassword.action";
            $.post(
                url,
                {"newPassword":password},
                function (data) {
                    if(data){
                        //修改密码成功
                        $.messager.alert("提示信息","修改密码成功","info");
                        $("#editPwdWindow").window("close");
                    }else{
                        //修改密码失败
                        $.messager.alert("提示信息","修改密码失败","error");
                    }
                }
            );
        }
    });
});