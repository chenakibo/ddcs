    <%@ page language="java" contentType="text/html; charset=UTF-8"
             pageEncoding="UTF-8" %>
        <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
        <html>
        <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>管理分区</title>
        <!-- 导入jquery核心类库 -->
        <script type="text/javascript"
        src="${pageContext.request.contextPath }/js/jquery-1.8.3.js"></script>
        <!-- 导入easyui类库 -->
        <link rel="stylesheet" type="text/css"
        href="${pageContext.request.contextPath }/js/easyui/themes/default/easyui.css">
        <link rel="stylesheet" type="text/css"
        href="${pageContext.request.contextPath }/js/easyui/themes/icon.css">
        <link rel="stylesheet" type="text/css"
        href="${pageContext.request.contextPath }/js/easyui/ext/portal.css">
        <link rel="stylesheet" type="text/css"
        href="${pageContext.request.contextPath }/css/default.css">
        <script type="text/javascript"
        src="${pageContext.request.contextPath }/js/easyui/jquery.easyui.min.js"></script>
        <script type="text/javascript"
        src="${pageContext.request.contextPath }/js/easyui/ext/jquery.portal.js"></script>
        <script type="text/javascript"
        src="${pageContext.request.contextPath }/js/easyui/ext/jquery.cookie.js"></script>
        <script
        src="${pageContext.request.contextPath }/js/easyui/locale/easyui-lang-zh_CN.js"
        type="text/javascript"></script>
        <script
        src="${pageContext.request.contextPath }/js/jquery.ocupload-1.1.2.js"
        type="text/javascript"></script>
        <script type="text/javascript">
        function doAdd(){
        $('#addSubareaWindow').window("open");
        }

        function doEdit(){
        //先获取选中条目
        var row=$("#grid").datagrid("getChecked");
        if(row.length<=0){
        $.messager.alert("提示信息","请选择要修改的条目","warning");
        }else{
        $('#editSubareaWindow').window("open");
        $('#editSubareaForm').form("load",row[0]);
        }
        }

        function doDelete(){
        var row=$("#grid").datagrid("getChecked");
        if(row.length<=0){
        $.messager.alert("提示信息","请选择要删除的条目","warning");
        }else{
        $.messager.confirm("确定对话框","您确定要删除所选条目吗？",function(r){
        if(r){
        var ids="";
        for(var i=0;i<row.length;i++){
        ids+=(row[i].id+",");
        }
        $.get("${pageContext.request.contextPath}/subareaAction_deleteSubarea.action?ids="+ids,function(data){
        if(data){
        $.messager.alert("提示信息","删除成功","warning");
        $("#grid").datagrid("reload");
        }else{
        $.messager.alert("提示信心","删除失败","warning");
        }
        });
        }
        });
        }
        }

        function doSearch(){
        $('#searchWindow').window("open");
        }

        function doExport(){
        //1.前台发送导出请求
        location.href="${pageContext.request.contextPath}/subareaAction_exportXls.action";
        //2.action接收请求
        //1）查询出所有数据
        //2）创建excel
        //3）将数据放如excel中
        //4）将excel返回到前台，已下载的方式打开
        }
        //工具栏
        var toolbar = [ {
        id : 'button-search',
        text : '查询',
        iconCls : 'icon-search',
        handler : doSearch
        }, {
        id : 'button-add',
        text : '增加',
        iconCls : 'icon-add',
        handler : doAdd
        }, {
        id : 'button-edit',
        text : '修改',
        iconCls : 'icon-edit',
        handler : doEdit
        },{
        id : 'button-delete',
        text : '删除',
        iconCls : 'icon-cancel',
        handler : doDelete
        },{
        id : 'button-import',
        text : '导入',
        iconCls : 'icon-redo',
        },{
        id : 'button-export',
        text : '导出',
        iconCls : 'icon-undo',
        handler : doExport
        }];
        // 定义列
        var columns = [ [ {
        field : 'id',
        checkbox : true,
        }, {
        field : 'showid',
        title : '分拣编号',
        width : 120,
        align : 'center',
        formatter : function(data,row ,index){
        return row.id;
        }
        },{
        field : 'province',
        title : '省',
        width : 120,
        align : 'center',
        formatter : function(data,row ,index){
        if(row.bcRegion!=null){
        return row.bcRegion.province;
        }else{
        return "未找到";
        }
        }
        }, {
        field : 'city',
        title : '市',
        width : 120,
        align : 'center',
        formatter : function(data,row ,index){
        if(row.bcRegion!=null){
        return row.bcRegion.city;
        }else{
        return "未找到";
        }
        }
        }, {
        field : 'district',
        title : '区',
        width : 120,
        align : 'center',
        formatter : function(data,row ,index){
        if(row.bcRegion!=null){
        return row.bcRegion.district;
        }else{
        return "未找到";
        }
        }
        }, {
        field : 'addresskey',
        title : '关键字',
        width : 120,
        align : 'center'
        }, {
        field : 'startnum',
        title : '起始号',
        width : 100,
        align : 'center'
        }, {
        field : 'endnum',
        title : '终止号',
        width : 100,
        align : 'center'
        } , {
        field : 'single',
        title : '单双号',
        width : 100,
        align : 'center'
        } , {
        field : 'position',
        title : '位置',
        width : 200,
        align : 'center'
        } ] ];

        $(function(){
        // 先将body隐藏，再显示，不会出现页面刷新效果
        $("body").css({visibility:"visible"});

        // 收派标准数据表格
        $('#grid').datagrid( {
        iconCls : 'icon-forward',
        fit : true,
        border : true,
        rownumbers : true,
        striped : true,
        pageList: [30,50,100],
        pagination : true,
        toolbar : toolbar,
        url : "${pageContext.request.contextPath}/subareaAction_pageQuery.action",
        idField : 'id',
        columns : columns,
        onDblClickRow :function(index,row){
        $("#editSubareaWindow").window("open");
        $("#editSubareaForm").form("load",row);
        }
        });
        //数据导入
        $("#button-import").upload({
        name:"subareaFile",
        action:"${pageContext.request.contextPath }/subareaAction_importXls.action"
        });
        // 添加分区
        $('#addSubareaWindow').window({
        title: '添加分区',
        width: 600,
        modal: true,
        shadow: true,
        closed: true,
        height: 400,
        resizable:false
        });
        // 修改分区
        $('#editSubareaWindow').window({
        title: '修改分区',
        width: 600,
        modal: true,
        shadow: true,
        closed: true,
        height: 400,
        resizable:false
        });
        // 查询分区
        $('#searchWindow').window({
        title: '查询分区',
        width: 400,
        modal: true,
        shadow: true,
        closed: true,
        height: 400,
        resizable:false
        });
        //保存操作表单提交
        $(function(){
        $('#save').click(function(){
        var v = $('#addSubareaForm').form('validate');
        if(v){
        $('#addSubareaForm').submit();
        }
        });

        $(function(){
        $("#district_combobox").combobox({
        mode:'remote',
        valueField:'id',
        textField:'district',
        url:'${pageContext.request.contextPath }/regionAction_listajax.action',
        });
        });
        });
        //修改操作表单提交
        $(function(){
        $('#edit').click(function(){
        var v = $('#editSubareaForm').form('validate');
        if(v){
        $('#editSubareaForm').submit();
        }
        });

        $(function(){
        $("#district_combobox_edit").combobox({
        mode:'remote',
        valueField:'id',
        textField:'district',
        url:'${pageContext.request.contextPath }/regionAction_listajax.action',
        });
        });
        });

        $("#btn").click(function(){
        //1.将查询条件表单中的数据转换成json对象
        //给表单绑定一个方法，可以通过该方法将表单数据转换成json对象
        $.fn.serializeJson=function(){
        var serializeObj={};
        var array=this.serializeArray();
        $(array).each(function(){
        if(serializeObj[this.name]){
        if($.isArray(serializeObj[this.name])){
        serializeObj[this.name].push(this.value);
        }else{
        serializeObj[this.name]=[serializeObj[this.name],this.value];
        }
        }else{
        serializeObj[this.name]=this.value;
        }
        });
        return serializeObj;
        };
        //2.使用datagrid的load方法实现带条件的分页查询
        //调用表单的刚刚绑定的方法，获取json对象
        var data = $('#searchForm').serializeJson();
        $("#grid").datagrid('load',data);
        //load方法执行的操作：
        //1）发送url属性指定的请求
        //2）发送data的json对象中的数据
        // data中的数据如:
        //{
        // 'region.province':'北京',
        // 'region.city':'北京',
        // 'region.district':'北京',
        // addresskey:'东城'
        //}
        //3.关闭查询窗口
        $('#searchWindow').window("close");
        });
        });
        </script>
        </head>
        <body class="easyui-layout" style="visibility:hidden;">
        <div region="center" border="false">
        <table id="grid"></table>
        </div>
        <!-- 添加 修改分区 -->
        <div class="easyui-window" title="分区添加修改" id="addSubareaWindow" collapsible="false" minimizable="false"
        maximizable="false" style="top:20px;left:200px">
        <div style="height:31px;overflow:hidden;" split="false" border="false" >
        <div class="datagrid-toolbar">
        <a id="save" icon="icon-save" href="#" class="easyui-linkbutton" plain="true" >保存</a>
        </div>
        </div>

        <div style="overflow:auto;padding:5px;" border="false">
        <form id="addSubareaForm" method="post"
        action="${pageContext.request.contextPath }/subareaAction_addSubarea.action">
        <table class="table-edit" width="80%" align="center">
        <tr class="title">
        <td colspan="2">分区信息</td>
        </tr>
        <tr>
        <td>分区编码</td>
        <td><input type="text" name="id" required="true"/></td>
        </tr>
        <tr>
        <td>选择区域</td>
        <td>
        <input id="district_combobox" name="bcRegion.id" />
        </td>
        </tr>
        <tr>
        <td>关键字</td>
        <td><input type="text" name="addresskey" class="easyui-validatebox" required="true"/></td>
        </tr>
        <tr>
        <td>起始号</td>
        <td><input type="text" name="startnum" class="easyui-validatebox" required="true"/></td>
        </tr>
        <tr>
        <td>终止号</td>
        <td><input type="text" name="endnum" class="easyui-validatebox" required="true"/></td>
        </tr>
        <tr>
        <td>单双号</td>
        <td>
        <select class="easyui-combobox" name="single" style="width:150px;">
        <option value="0">单双号</option>
        <option value="1">单号</option>
        <option value="2">双号</option>
        </select>
        </td>
        </tr>
        <tr>
        <td>位置信息</td>
        <td><input type="text" name="position" class="easyui-validatebox" required="true" style="width:250px;"/></td>
        </tr>
        </table>
        </form>
        </div>
        </div>
        <!-- 添加 修改分区 -->
        <div class="easyui-window" title="分区添加修改" id="editSubareaWindow" collapsible="false" minimizable="false"
        maximizable="false" style="top:20px;left:200px">
        <div style="height:31px;overflow:hidden;" split="false" border="false" >
        <div class="datagrid-toolbar">
        <a id="edit" icon="icon-save" href="#" class="easyui-linkbutton" plain="true" >保存</a>
        </div>
        </div>

        <div style="overflow:auto;padding:5px;" border="false">
        <form id="editSubareaForm" method="post"
        action="${pageContext.request.contextPath }/subareaAction_editSubarea.action">
        <table class="table-edit" width="80%" align="center">
        <tr class="title">
        <td colspan="2">分区信息</td>
        </tr>
        <tr style="display: none">
        <td>id</td>
        <td><input type="text" name="id" required="true"/></td>
        </tr>
        <tr>
        <td>分区编码</td>
        <td><input type="text" required="true"/></td>
        </tr>
        <tr>
        <td>选择区域</td>
        <td>
        <input id="district_combobox_edit" name="bcRegion.id" />
        </td>
        </tr>
        <tr>
        <td>关键字</td>
        <td><input type="text" name="addresskey" class="easyui-validatebox" required="true"/></td>
        </tr>
        <tr>
        <td>起始号</td>
        <td><input type="text" name="startnum" class="easyui-validatebox" required="true"/></td>
        </tr>
        <tr>
        <td>终止号</td>
        <td><input type="text" name="endnum" class="easyui-validatebox" required="true"/></td>
        </tr>
        <tr>
        <td>单双号</td>
        <td>
        <select class="easyui-combobox" name="single" style="width:150px;">
        <option value="0">单双号</option>
        <option value="1">单号</option>
        <option value="2">双号</option>
        </select>
        </td>
        </tr>
        <tr>
        <td>位置信息</td>
        <td><input type="text" name="position" class="easyui-validatebox" required="true" style="width:250px;"/></td>
        </tr>
        </table>
        </form>
        </div>
        </div>
        <!-- 查询分区 -->
        <div class="easyui-window" title="查询分区窗口" id="searchWindow" collapsible="false" minimizable="false"
        maximizable="false" style="top:20px;left:200px">
        <div style="overflow:auto;padding:5px;" border="false">
        <form id="searchForm">
        <table class="table-edit" width="80%" align="center">
        <tr class="title">
        <td colspan="2">查询条件</td>
        </tr>
        <tr>
        <td>省</td>
        <td><input type="text" name="region.province"/></td>
        </tr>
        <tr>
        <td>市</td>
        <td><input type="text" name="region.city"/></td>
        </tr>
        <tr>
        <td>区（县）</td>
        <td><input type="text" name="region.district"/></td>
        </tr>
        <tr>
        <td>关键字</td>
        <td><input type="text" name="addresskey"/></td>
        </tr>
        <tr>
        <td colspan="2">
        <a id="btn" href="#" class="easyui-linkbutton"
        data-options="iconCls:'icon-search'">查询</a>
        </td>
        </tr>
        </table>
        </form>
        </div>
        </div>
        </body>
        </html>