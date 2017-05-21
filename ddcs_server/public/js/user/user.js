/**
 * Created by Administrator on 2017/5/4.
 */
$(function () {

    var curUserName = window.sessionStorage.curUserName;
    var curUserRole = window.sessionStorage.curUserRole;
    var index_ajaxInterface = new indexAjaxInterface();
    var user_ajaxInterface = new userAjaxInterface();

    $("#loginUser").html(curUserName);
    $("#loginRole").html( curUserRole== 0?"管理员":"普通用户");
    /*
    * 初始化页面按钮
    * */
    initPageBtn()
    /*
    * 检查用户是否登录
    * */
    // checkUserLogin();
    /*
    * 初始化用户列表
    * */
    initUserList();
    /*
    * 获取用户列表
    * */
    getUserList();
    /*
    * 新建用户
    * */
    $("#create").click(function () {
        $('#userInfo').modal();
    });
    $("#submitReg").click(function () {
        register();
        $('#register_form').modal("hide")
    });
    /*
    * 显示用户信息
    * */
    $("#userIcon").click(function () {
        showUserInfo();
        $('#userInfo').modal();
    });

    /*
    * 查询用户信息
    * */
    $("#search_btn").click(function () {
        queryUser();
    });
    /*
    * 删除用户
    * */
    $("#delete").click(function () {
        uxConfirm("您确定要删除该用户？",function (flag) {
            if(flag){
                deleteUser();
                getUserList();
            }else {
                return;
            }
        })
    })
    $(".user_oper_delete").click(function () {
        uxConfirm("您确定要删除该用户？",function (flag) {
            if(flag){
                deleteUser();
                getUserList();
            }else {
                return;
            }
        })
    });
    /*
    * 修改密码
    * */
    $(".user_oper_mod").click(function () {
        $("#mod_form").modal();
    });
    $("#modify_btn").click(function () {
        modifyUser();
        $("#mod_form").modal("hide");
    });
    $("#cancel").click(function () {
        calcel($("#mod_form"));
    })
    /*
    * 退出当前用户
    * */
    $("#signOutIcon").click(function () {
        uxConfirm("您确定退出当前用户？",function (flag) {
            if(flag){
                var sessionObj = window.sessionStorage;
                for(var i in sessionObj)
                {
                    window.sessionStorage.removeItem(i);
                };
                location.href = "https://localhost:11111/"
            }else {
                return;
            }
        });
    });
    /*
    * 跳转到首页
    * */
    $("#site_manager").click(function () {
        location.href="https://localhost:11111/index";
    });
    /*
    * 跳转到数据采集页面
    * */
    $("#data_collect").click(function () {
        location.href="https://localhost:11111/collect";
    });
    /*
     * 跳转到用户管理页面
     * */
    $("#user_manager").click(function () {
        location.href="https://localhost:11111/user";
    });
    /*
    * 定时获取用户列表
    * */
    function getUserList() {
        var jsonDataObj = {
            request :{"mainRequest":"enumUserList","subRequest":"","ssubRequest":""},
            "data" :{
            },
        };
        var jsonDataStr = JSON.stringify(jsonDataObj);
        user_ajaxInterface.ajaxRequest(false,jsonDataStr,dealWithUserListData);
        // var timer = setTimeout(function () {
        //     getSiteList();
        // },30000);
    }

    /*
     * 功能：处理返回的用户数据
     */
    function dealWithUserListData(retJson)
    {
        var retjsonStr = JSON.parse(retJson);
        if(retjsonStr.rstcode == "success")
        {
            $("#table").bootstrapTable("load",retjsonStr.data);
            // listenTable();
        }else{
            uxAlert(retjsonStr.desc);
        }
    };

    /*
    * 检查是否登录
    * */
    function checkUserLogin() {
        if(window.sessionStorage.curUserName == undefined || window.sessionStorage.curUserRole == undefined){
            uxAlert("您还未登录，请先登录！");
            setTimeout(function () {
                location.href = "https://localhost:11111/"
            },2000)
        }
    }

    /***************************初始化用户列表表格********************/
    function initUserList()
    {
        var col = [[
            {
                field: 'radio' ,
                radio: true ,
                align: 'center'
            },
            {
                field: 'number' ,
                title: '序&nbsp;&nbsp;&nbsp;&nbsp;号' ,
                align: 'center',
                formatter:function (value,row,index) {
                    return index+1;
                }
            },
            // {
            //     field: 'id' ,
            //     title: '站点ID' ,
            //     align: 'center'
            // },
            {
                field: 'username' ,
                title: '用户名' ,
                align: 'center'
            },
            {
                field: 'usertype' ,
                title: '用户角色' ,
                align: 'center'
            },
            {
                field: 'email' ,
                title: '用户邮箱' ,
                align: 'center'
            },
            {
                field: 'mobile' ,
                title: '手机号码' ,
                align: 'center'
            },
            {
                field: 'user_operate' ,
                title: '操&nbsp;&nbsp作' ,
                align: 'center' ,
                formatter:function(value,row,index){
                    var icon;
                   if(curUserRole == "0"){
                       icon= '<i title="操作" class="fa fa-trash fa-fw user_oper_delete" style="color: #ee9b84;cursor: pointer"></i>' +
                           '&nbsp;&nbsp;&nbsp;&nbsp;<i title="修改" class="fa fa-pencil fa-fw user_oper_mod" style="cursor: pointer"></i>';
                        return icon;
                   }else {
                       icon= '<i title="操作" class="fa fa-trash fa-fw" style="color: #959595;cursor: no-drop;" ></i>';
                       return icon;
                   }
            }}
        ]];
        $('#table').bootstrapTable({
            classes:"table table-no-bordered",
            //toolbar:"#dfslist_toobar",
            height:606,
            columns: col,
            idField:"number",
            singleSelect:true,
            rowStyle:function (row,index) {
                // var classes = ['success'];
                if ((index+1) % 2 === 0) {
                    return {
                        classes: "rowStyle"
                    };
                }
                return {};
            },
            clickToSelect:true,
        });
    }
    // function listenTable()
    // {
    //     var $table = $("#table");
    //     $table.on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table',function(arg){
    //         // uxAlert("hello");
    //     });
    // }
    /*
    * 初始化页面按钮
    * */
    function initPageBtn() {
        if(curUserRole == 1){
            $("#delete").attr("disabled",true);
            $("#create").attr("disabled",true);
        }
    }

    /*
     * 注册
     */
    function register()
    {
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
        user_ajaxInterface.ajaxRequest(false,jsonDataStr,dealWithRegisterData);
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
    * 删除用户
    * */
    function deleteUser() {
        var user_id = $('#table').bootstrapTable('getSelections')[0].id;
        var jsonDataObj = {
            request :{"mainRequest":"deleteUser","subRequest":"","ssubRequest":""},
            "data" :{
                id:user_id
            },
        };
        var jsonDataStr = JSON.stringify(jsonDataObj);
        user_ajaxInterface.ajaxRequest(false,jsonDataStr,dealWithDeleteUserData);
    };
    function dealWithDeleteUserData(retJson) {
        var retjsonStr = JSON.parse(retJson);
        if(retjsonStr.rstcode == "success")
        {
            // $("#table").bootstrapTable("refresh");
            uxAlert("删除成功！");
            getUserList();
        }else{
            uxAlert(retjsonStr.desc);
        }
    };

    /*
    * 站点查询
    * */
    function queryUser() {
        var condition = $("#search_condition").val();
        var searchText = $("#search_text").val();
        if (searchText == ""){
            uxAlert("搜索条件不能为空！");
            return;
        }
        var jsonDataObj = {
            request :{"mainRequest":"queryUser","subRequest":"","ssubRequest":""},
            "data" :{
                condition:condition,
                searchText:searchText
            },
        };
        var jsonDataStr = JSON.stringify(jsonDataObj);
        user_ajaxInterface.ajaxRequest(false,jsonDataStr,dealWithQueryUserData);
    };
    function dealWithQueryUserData(jsonString) {
        var retjsonData = JSON.parse(jsonString);
        if(retjsonData.rstcode = "success"){
            $("#table").bootstrapTable("load",retjsonData.data);
        }else {
            uxAlert(retjsonData.desc);
        };
    };

    /*
    * 显示用户信息
    * */
    function showUserInfo() {
        var jsonDataObj = {
            request :{"mainRequest":"showUserInfo","subRequest":"","ssubRequest":""},
            "data" :{
                currUserName:curUserName,
            },
        };
        var jsonDataStr = JSON.stringify(jsonDataObj);
        user_ajaxInterface.ajaxRequest(false,jsonDataStr,dealWithShowUserInfoData)
    };
    function dealWithShowUserInfoData(jsonString) {
        var retJsonData = JSON.parse(jsonString);
        if(retJsonData.rstcode = "success"){
            $("#username").html(retJsonData.data[0].username);
            $("#password").html(retJsonData.data[0].password);
            $("#email").html(retJsonData.data[0].email);
            if(retJsonData.data[0].usertype == "0"){
                $("#usertype").html("管理员");
            }else{
                $("#usertype").html("普通用户");
            };
            $("#mobile").html(retJsonData.data[0].mobile);
        }else {
            uxAlert(retJsonData.desc);
        };
    };
    function modifyUser() {
        var oldPassword = $("#oldpassword").val();
        var newPassword = $("#newpassword").val();
        var newPassword2 = $("#newpassword2").val();
        var user_id = $('#table').bootstrapTable('getSelections')[0].id;
        if(newPassword != newPassword2){
            uxAlert("两次密码输入不一致！");
            return;
        };
        var jsonDataObj = {
            request :{"mainRequest":"modifyUser","subRequest":"","ssubRequest":""},
            "data" :{
                id:user_id,
                oldpwd:oldPassword,
                newpwd:newPassword
            },
        };
        var jsonDataStr = JSON.stringify(jsonDataObj);
        user_ajaxInterface.ajaxRequest(false,jsonDataStr,dealWithModifyUserData)
    };
    function dealWithModifyUserData(jsonString) {
        var retJsonData = JSON.parse(jsonString);
        if (retJsonData.rstcode == "success"){
            uxAlert("修改成功！")
        }else {
            uxAlert(retJsonData.desc);
        }
    };
    /*
    * 取消
    * */
    function calcel(element) {
        element.modal("hide")
    }
})