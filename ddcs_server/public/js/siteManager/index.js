/**
 * Created by Administrator on 2017/5/4.
 */
$(function () {

    var curUserName = window.sessionStorage.curUserName;
    var curUserRole = window.sessionStorage.curUserRole;
    var index_ajaxInterface = new indexAjaxInterface();

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

    /*
    *查询站点信息的功能
    * */
    $("#search_btn").click(function () {
        querySite();
    })
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
        // var timer = setTimeout(function () {
        //     getSiteList();
        // },30000);
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
                       icon= '<i title="操作" class="fa fa-cog fa-spin fa-fw" style="color: #42c2ee;cursor: pointer"></i>';
                        return icon;
                   }else {
                       icon= '<i title="操作" class="fa fa-cog fa-fw" style="color: #737676;cursor: no-drop;" ></i>';
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
            clickToSelect:true
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
        var site_id = $('#table').bootstrapTable('getSelections')[0].id;
        var jsonDataObj = {
            request :{"mainRequest":"deleteSite","subRequest":"","ssubRequest":""},
            "data" :{
                id:site_id
            },
        };
        var jsonDataStr = JSON.stringify(jsonDataObj);
        index_ajaxInterface.ajaxRequest(false,jsonDataStr,dealWithDeleteSiteData);
    };
    function dealWithDeleteSiteData(retJson) {
        var retjsonStr = JSON.parse(retJson);
        if(retjsonStr.rstcode == "success")
        {
            uxAlert("删除成功！");
            $("#table").bootstrapTable("reload");
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
        var jsonDataObj = {
            request :{"mainRequest":"deleteSite","subRequest":"","ssubRequest":""},
            "data" :{
                id:site_id
            },
        };
    }
})