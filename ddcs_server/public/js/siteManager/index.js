/**
 * Created by Administrator on 2017/5/4.
 */
$(function () {

    var curUserName = window.sessionStorage.curUserName;
    var curUserRole = window.sessionStorage.curUserRole;

    $("#loginUser").html(curUserName);
    $("#loginRole").html( curUserRole== 0?"管理员":"普通用户");

    checkUserLogin();

    function checkUserLogin() {
        if(window.sessionStorage.curUserName == undefined || window.sessionStorage.curUserRole == undefined){
            uxAlert("您还未登录，请先登录！");
            setTimeout(function () {
                location.href = "https://localhost:11111/"
            },3000)

        }
    }

    /***************************初始化站点列表表格********************/
    function initSiteList()
    {
        var par = [[
            {
                field: 'site_radio' ,
                checkbox: true ,
                align: 'center'
            },
            {
                field: 'site_number' ,
                title: '序&nbsp;&nbsp;&nbsp;&nbsp;号' ,
                align: 'center',
                formatter:function (value,row,index) {
                    return index+1;
                }
            },
            {
                field: 'site_ID' ,
                title: '站点ID' ,
                align: 'center'
            },
            {
                field: 'site_name' ,
                title: '站点名称' ,
                align: 'center'
            },
            {
                field: 'site_IP' ,
                title: '站点IP' ,
                align: 'center'
            },
            {
                field: 'site_port' ,
                title: '端口' ,
                align: 'center'
            },
            {
                field: 'site_state' ,
                title: '运行状态' ,
                align: 'center' ,
                formatter:function(value,row,siteManager){
                if(row.site_state == 1) {
                    var discon = '<i title="运行" class="fa fa-circle fa-spin fa-fw" style="color: #14e6ff"></i>'
                    return discon;
                }else if(row.instance_state == 2){
                    var constr = '<i title="停止" class="fa fa-circle fa-fw" style="color: #737676"></i>';
                    return constr;
                }else{
                    var err = '<i title="故障" class="fa fa-circle fa-fw" style="color: #ce642b"></i>';
                    return err;
                }
            }},
            {
                field: 'site_operate' ,
                title: '操&nbsp;&nbsp作' ,
                align: 'center' ,
                formatter:function(value,row,index){
                    var icon;
                   if(curUserRole == "1"){
                        icon= '<i title="操作" class="fa fa-cog fa-spin fa-fw" style="color: #ce642b;cursor: pointer"></i>';
                        return icon;
                   }else {
                       icon= '<i title="操作" class="fa fa-cog fa-spin fa-fw" style="color: #ce642b;cursor: pointer;" enabled="false"></i>';
                       return icon;
                   }
            }}
        ]];
        $('#table').bootstrapTable({
            classes:"table table-no-bordered",
            //toolbar:"#dfslist_toobar",
            height:606,
            columns: par,
            idField:"site_number",
        });
    };
    initSiteList()
})