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
    checkUserLogin();
    /*
    * 初始化站点列表
    * */
    initSiteList();

    /*
    * 获取站点列表
    * */
    getSiteList();

    /*
     * 删除站点信息
     * */
    $("#delete").click(function () {
        uxConfirm("您确定删除这个站点吗？",function (flag) {
            if(flag){
                deleteSite();
            }
        })
    });
    $(".site_oper").click(function () {
        uxConfirm("您确定删除这个站点吗？",function (flag) {
            if(flag){
                deleteSite();
            }
        })
    });
    /*
    *查询站点信息的功能
    * */
    $("#search_btn").click(function () {
        querySite();
    });
    /*
    * 刷新站点
    * */
    $("#refresh").click(function () {
        getSiteList();
    });

    /*
    * 显示用户信息
    * */
    $("#userIcon").click(function () {
        showUserInfo();
        $('#userInfo').modal();
    });
    
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
    * 定时获取站点列表，间隔30秒
    * */
    function getSiteList() {
        var jsonDataObj = {
            request :{"mainRequest":"enumSiteList","subRequest":"","ssubRequest":""},
            "data" :{
            },
        };
        var jsonDataStr = JSON.stringify(jsonDataObj);
        index_ajaxInterface.ajaxRequest(false,jsonDataStr,dealWithSiteListData);
        var timer = setTimeout(function () {
            getSiteList();
        },10000);
    }

    /*
     * 功能：处理返回的站点数据
     */
    function dealWithSiteListData(retJson)
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

    /***************************初始化站点列表表格********************/
    function initSiteList()
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
            {
                field: 'id' ,
                title: '站点ID' ,
                align: 'center'
            },
            {
                field: 'sitename' ,
                title: '站点名称' ,
                align: 'center'
            },
            {
                field: 'ip' ,
                title: '站点IP' ,
                align: 'center'
            },
            {
                field: 'port' ,
                title: '端口' ,
                align: 'center'
            },
            {
                field: 'state' ,
                title: '运行状态' ,
                align: 'center' ,
                formatter:function(value,row,index){
                if(row.state == 1) {
                    var discon = '<i title="运行" class="fa fa-circle fa-spin fa-fw" style="color: #4adc7a"></i>'
                    return discon;
                }else{
                    var err = '<i title="故障" class="fa fa-circle fa-fw" style="color: #e48140"></i>';
                    return err;
                }
            }},
            {
                field: 'site_operate' ,
                title: '操&nbsp;&nbsp作' ,
                align: 'center' ,
                formatter:function(value,row,index){
                    var icon;
                   if(curUserRole == "0"){
                       icon= '<i title="操作" class="fa fa-trash fa-fw site_oper" style="color: #ee9b84;cursor: pointer"></i>';
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
            clickToSelect:true,
            rowStyle:function (row,index) {
                // var classes = ['success'];
                if ((index+1) % 2 === 0) {
                    return {
                        classes: "rowStyle"
                    };
                }
                return {};
            },
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
            $("#delete").attr("disabled",true)
        }
    }

    /*
    * 删除站点
    * */
    function deleteSite() {
        var site_state = $('#table').bootstrapTable('getSelections')[0].state;
        if(site_state == "1"){
            uxAlert("站点正在运行，不能删除！");
            return;
        }else {
            var site_id = $('#table').bootstrapTable('getSelections')[0].id;
            var jsonDataObj = {
                request :{"mainRequest":"deleteSite","subRequest":"","ssubRequest":""},
                "data" :{
                    id:site_id
                },
            };
            var jsonDataStr = JSON.stringify(jsonDataObj);
            index_ajaxInterface.ajaxRequest(false,jsonDataStr,dealWithDeleteSiteData);
        }
    };
    function dealWithDeleteSiteData(retJson) {
        var retjsonStr = JSON.parse(retJson);
        if(retjsonStr.rstcode == "success")
        {
            // $("#table").bootstrapTable("refresh");
            uxAlert("删除成功！");
            getSiteList();
        }else{
            uxAlert(retjsonStr.desc);
        }
    };

    /*
    * 站点查询
    * */
    function querySite() {
        var condition = $("#search_condition").val();
        var searchText = $("#search_text").val();
        if (searchText == ""){
            uxAlert("搜索条件不能为空！");
            return;
        }
        var jsonDataObj = {
            request :{"mainRequest":"querySite","subRequest":"","ssubRequest":""},
            "data" :{
                condition:condition,
                searchText:searchText
            },
        };
        var jsonDataStr = JSON.stringify(jsonDataObj);
        index_ajaxInterface.ajaxRequest(false,jsonDataStr,dealWithQuerySiteData);
    };
    function dealWithQuerySiteData(jsonString) {
        var retjsonData = JSON.parse(jsonString);
        if(retjsonData.rstcode = "success"){
            $("#table").bootstrapTable("load",retjsonData.data);
        }else {
            uxAlert(retjsonData.desc);
        };
    };
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
})