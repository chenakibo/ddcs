$(function () {

    var curUserName = window.sessionStorage.curUserName;
    var curUserRole = window.sessionStorage.curUserRole;
    var collect_ajaxInterface = new collectAjaxInterface();
    var user_ajaxInterface = new userAjaxInterface();
    $("#loginUser").html(curUserName);
    $("#loginRole").html( curUserRole== 0?"管理员":"普通用户");
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
     * 显示用户信息
     * */
    $("#userIcon").click(function () {
        showUserInfo();
        $('#userInfo').modal();
    });
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
    /*
    * 初始化运行站点列表
    * */
    initRunSiteList();
    /***************************初始化运行站点列表********************/
    function initRunSiteList()
    {
        var col = [[
            // {
            //     field: 'radio' ,
            //     radio : true ,
            //     align: 'center',
            //     // class: 'col_hide'
            // },
            {
                field: 'state' ,
                title: '状态' ,
                align: 'center',
                formatter:function(value,row,index){
                    var icon;
                    icon= '<i title="状态" class="fa fa-circle fa-fw" style="color: #34ee2d;cursor: pointer"></i>'
                    return icon;
                }
            },

            {
                field: 'id' ,
                title: 'id' ,
                align: 'center',
                class: 'col_hide'
            },
            {
                field: 'sitename' ,
                title: '站点名称' ,
                align: 'center',
                formatter:function (value,row,index) {
                    var ret = '<span class="col_name">'+value+'</span>';
                    return ret;
                }
            },
            {
                field: 'ip' ,
                title: '主机地址' ,
                align: 'center',
                class:'col_hide'
            },
            {
                field: 'port' ,
                title: '主机端口' ,
                align: 'center',
                class:'col_hide'
            },
            // {
            //     field: 'user_operate' ,
            //     title: '操&nbsp;&nbsp作' ,
            //     align: 'center' ,
            //     formatter:function(value,row,index){
            //         var icon;
            //         if(curUserRole == "0"){
            //             icon= '<i title="操作" class="fa fa-trash fa-fw user_oper_delete" style="color: #ee9b84;cursor: pointer"></i>' +
            //                 '&nbsp;&nbsp;&nbsp;&nbsp;<i title="修改" class="fa fa-pencil fa-fw user_oper_mod" style="cursor: pointer"></i>';
            //             return icon;
            //         }else {
            //             icon= '<i title="操作" class="fa fa-trash fa-fw" style="color: #959595;cursor: no-drop;" ></i>';
            //             return icon;
            //         }
            //     }}
        ]];
        $('#run_site_table').bootstrapTable({
            classes:"table table-no-bordered",
            //toolbar:"#dfslist_toobar",
            height:606,
            columns: col,
            idField:"number",
            singleSelect:true,
            onClickRow:function (row,element) {
                getHostConfigInfo(row.id);
                // setInterval(function () {
                getUsageRate(row.ip)
                // },10000)
            }
        });
    }

    /*
    * 获取运行站点列表
    * */
    getRunSiteList();
    function getRunSiteList() {
        var jsonDataObj = {
            request :{"mainRequest":"enumRunSiteList","subRequest":"","ssubRequest":""},
            "data" :{
            },
        };
        var jsonDataStr = JSON.stringify(jsonDataObj);
        collect_ajaxInterface.ajaxRequest(false,jsonDataStr,dealWithRunSiteListData);
    };
    function dealWithRunSiteListData(jsonString) {
        var retJsonData = JSON.parse(jsonString);
        if(retJsonData.rstcode == "success"){
            $("#run_site_table").bootstrapTable("load",retJsonData.data);
        }else {
            uxAlert(retJsonData.desc);
        };
    };
    /*
    * 获取主机配置信息
    * */
    // $(".col_name").click(function () {
    //     getHostConfigInfo();
    // })
    function getHostConfigInfo(id) {
        // var id = $('#run_site_table').bootstrapTable('getSelections')[0].id;
        var jsonDataObj = {
            request :{"mainRequest":"getHostConfigInfo","subRequest":"","ssubRequest":""},
            "data" :{
                id : id
            },
        };
        var jsonDataStr = JSON.stringify(jsonDataObj);
        collect_ajaxInterface.ajaxRequest(false,jsonDataStr,dealWithHostConfigInfo);
    };
    function dealWithHostConfigInfo(jsonString) {
        var retJsonData = JSON.parse(jsonString);
        if(retJsonData.rstcode == "success"){
            $("#hostname").html(retJsonData.data[0].hostname);
            $("#platform").html(retJsonData.data[0].platform);
            $("#arch").html(retJsonData.data[0].arch);
            $("#ip").html(retJsonData.data[0].ip);
            $("#cpuinfo").html(retJsonData.data[0].cpuinfo);
            $("#cpunumber").html(retJsonData.data[0].cpunumber);
            $("#totalmem").html(retJsonData.data[0].totalmem);
        }else {
            uxAlert(retJsonData.desc);
        }
    };
    /*
    * 获取使用率
    * */
    function getUsageRate(ip) {
        var jsonDataObj = {
            request :{"mainRequest":"getUsageRate","subRequest":"","ssubRequest":""},
            "data" :{
                ip : ip,
                cmd : "getUsageRate"
            },
        };
        var jsonDataStr = JSON.stringify(jsonDataObj);
        collect_ajaxInterface.ajaxRequest(false,jsonDataStr,dealWithUsageRate);
    };
    function dealWithUsageRate(jsonString) {
        var retJsonData = JSON.parse(jsonString);
        if(retJsonData.rstcode == "success"){
            initChart(retJsonData);
        }else {
            uxAlert(retJsonData.desc);
        };
    }
    /*
     * 初始化图表
     * */
    function initChart(jsonData) {
        var labels = jsonData.data.label;
        for(var i in labels){
            if(!labels[i].indexOf("FlashPlayerPlugin")){
                labels[i] ="FlashPlugin"
            }
        }
        var data = {
            labels : labels,
            datasets : [
                {
                    label:"CPU%",
                    fillColor : "#249e1e",     //背景色，常用transparent透明
                    strokeColor : "rgba(220,220,220,1)",  //线条颜色，也可用"#ffffff"
                    // pointColor : "rgba(81,192,238,1)",   //点的填充颜色
                    // pointStrokeColor : "#f2fc31",            //点的外边框颜色
                    data : jsonData.data.data.cpu      //点的Y轴值
                },
                {
                    label:"内存%",
                    fillColor : "#51c0ee",
                    strokeColor : "rgba(151,187,205,1)",
                    // pointColor : "rgba(151,187,205,1)",
                    // pointStrokeColor : "#f2fc31",
                    data : jsonData.data.data.mem
                },
            ]
        };
        //定义图表的参数
        var options = {
            scaleOverlay: true,//是否显示柱状图上面的数据
            scaleOverride: false,//Boolean - If we want to override with a hard coded scale
            scaleSteps: null,//Number - The number of steps in a hard coded scale
            scaleStepWidth: 50,//Number - The value jump in the hard coded scale
            scaleStartValue: null,//Number - The scale starting value
            scaleLineColor: "#17fdff",//x/y轴坐标线的颜色
            scaleLineWidth: null,//坐标线的宽度
            scaleShowLabels: true,//是否显示label值
            scaleLabel: "<%=value%>",//Interpolated JS string - can access value
            scaleFontFamily: "'Arial'",//字体Family
            scaleFontSize: 16,//字体大小
            scaleFontStyle: "normal", //字体样式
            scaleFontColor: "#51c0ee",//字体颜色
            scaleShowGridLines: false,///Boolean - Whether grid lines are shown across the chart
            scaleGridLineColor: "rgba(0,0,0,.05)",//网格线颜色
            scaleGridLineWidth: 1,//Number - Width of the grid lines
            barShowStroke: true,//Boolean - If there is a stroke on each bar
            barStrokeWidth: 2,//Number - Pixel width of the bar stroke
            barValueSpacing: 5,// 柱状块与x值所形成的线（如：x=20这条线）之间的距离
            barDatasetSpacing: 1,// 在同一x值内的柱状块之间的间距
            animation: true,//Boolean - Whether to animate the chart
            animationSteps: 60,//Number - Number of animation steps
            animationEasing: "easeOutQuart",//String - Animation easing effect
            onAnimationComplete:function () {
                var strHtml = "";
                for (var i = 0; i < this.datasets.length; i++) {
                    strHtml += "<li><div style='width: 60px;height: 30px;border:1px solid #17fdff;-webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px;" +
                        "background-color:" + this.datasets[i].fillColor + ";'></div><label style='color: #fcd871;margin-left: 10px'>" + this.datasets[i].label + "</label></li>";
                }
                $("#bar_label").html(strHtml);
            }//Function - Fires when the animation is complete
        }
        var cxt = $("#myChart").get(0).getContext("2d");
        var bar = new Chart(cxt);
        bar.Bar(data,options);
    }
})