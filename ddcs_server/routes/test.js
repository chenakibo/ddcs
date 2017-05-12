/***************************初始化实例列表表格********************/
function initSiteList()
{
    var par = [[{field: 'instance_radio' , radio: true ,align: 'center' },
        {field: 'instance_number' ,title: '序&nbsp;&nbsp;&nbsp;&nbsp;号' ,align: 'center' },
        {field: 'instance_name' ,title: '实例名称' ,align: 'center' ,formatter:function(value,row,index){
            var text;
            if(currentRole == 0)
            {
                text = '<a href="#" data-type="text" data-pk="1" data-placement="right" class="editable editable-click editable-empty"> '+ row.instance_name +'</a>';
            }else{
                text = row.instance_name ;
            }
            return text;
        }
        },
        {field: 'instance_ID' ,title: '实例ID' ,align: 'center' },
        {field: 'instance_state' , title: '运行状态' ,align: 'center' ,formatter:function(value,row,index){
            if(row.instance_state == 1) {
                var discon = '<a title = "运行">' + '<button class = "run-btn"></button>' + '</a>';
                return discon;
            }else if(row.instance_state == 2){
                var constr = '<a title = "停止">' + '<button class = "stop-btn"></button>' + '</a>';
                return constr;
            }else{
                var err = '<a title = "故障">' + '<button class = "error-btn"></button>' + '</a>';
                return err;
            }
        }},
        {field: 'creat_time' , title: '创建时间',align: 'center' },
        {field: 'instance_type' , title: '类&nbsp;&nbsp;&nbsp;&nbsp;型' ,align: 'center' },
        {field: 'db_version' , title: '数据库版本' ,align: 'center' },
        {field: 'instance_operate' , title: '操&nbsp;&nbsp作' ,align: 'center' , formatter:function(value,row,index){
            var par = row.instance_name + "," + row.instance_type + "," + row.creat_time+"," + row.instance_ID + "," + row.cluster_path + "," + row.DFSId ;
            var constr;
            if(row.instance_state == 1 || row.instance_state == 2)
            {
                constr = '<a title = "配置">' + '<button class = "site-setupImg" onclick = "getInstanceOper(\'' + par + '\')"' + '></button>' + '</a>';
            }else{
                constr = '<a title = "配置">' + '<button class = "site-no-operImg"' + '></button>' + '</a>';
            }
            return constr;
        }}
    ]];
    $('#table').bootstrapTable({
        classes:"table table-no-bordered",
        //toolbar:"#dfslist_toobar",
        height:606,
        columns: par,
        idField:"instance_number",
    });
}