    <%@ page language="java" contentType="text/html; charset=UTF-8"
             pageEncoding="UTF-8" %>
        <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
        <html>
        <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Insert title here</title>
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
        <script src="${pageContext.request.contextPath }/js/easyui/outOfBounds.js" type="text/javascript"></script>
        <script type="text/javascript">
        function doAdd() {
        //alert("增加...");
        $('#addStaffWindow').window("open");
        }

        function doView() {
        alert("查看...");
        }

        function doDelete() {
        //获取选中条数
        var rows = $("#grid").datagrid("getSelections");
        if (rows.length <= 0) {
        //如果未选中，弹出提示
        $.messager.alert('提示信息', '请您选择要删除的数据！', 'warning');
        } else {
        //如果选中，获取选中的id，发送更新请求
        var staffIDArr = new Array();
        for(var i=0; i<rows.length; i++){
        staffIDArr.push(rows[i].id);
        }
        var ids = staffIDArr.join(',');
        //发送请求
        location.href="${pageContext.request.contextPath}/staffAction_delete.action?ids="+ids;
        }
        }

        function doRestore() {
        alert("将取派员还原...");
        }
        //工具栏
        var toolbar = [ {
        id : 'button-view',
        text : '查询',
        iconCls : 'icon-search',
        handler : doView
        }, {
        id : 'button-add',
        text : '增加',
        iconCls : 'icon-add',
        handler : doAdd
        }, {
        id : 'button-delete',
        text : '作废',
        iconCls : 'icon-cancel',
        handler : doDelete
        }, {
        id : 'button-save',
        text : '还原',
        iconCls : 'icon-save',
        handler : doRestore
        } ];
        // 定义列
        var columns = [ [ {
        field : 'id',
        checkbox : true,
        }, {
        field : 'name',
        title : '姓名',
        width : 120,
        align : 'center'
        }, {
        field : 'telephone',
        title : '手机号',
        width : 120,
        align : 'center'
        }, {
        field : 'haspda',
        title : '是否有PDA',
        width : 120,
        align : 'center',
        formatter : function(data, row, index) {
        if (data == "1") {
        return "有";
        } else {
        return "无";
        }
        }
        }, {
        field : 'deltag',
        title : '是否作废',
        width : 120,
        align : 'center',
        formatter : function(data, row, index) {
        if (data == "0") {
        return "正常使用";
        } else {
        return "已作废";
        }
        }
        }, {
        field : 'standard',
        title : '取派标准',
        width : 120,
        align : 'center'
        }, {
        field : 'station',
        title : '所谓单位',
        width : 200,
        align : 'center'
        } ] ];

        $(function() {
        // 先将body隐藏，再显示，不会出现页面刷新效果
        $("body").css({
        visibility : "visible"
        });

        // 取派员信息表格
        $('#grid').datagrid({
        iconCls : 'icon-forward',
        fit : true,
        border : true,
        rownumbers : true,
        striped : true,
        pageList : [ 30, 50, 100 ],
        pagination : true,
        toolbar : toolbar,
        url : "${pageContext.request.contextPath}/staffAction_pageQuery.action",
        idField : 'id',
        columns : columns,
        onDblClickRow : doDblClickRow
        });

        // 添加取派员窗口
        $('#addStaffWindow').window({
        title : '添加取派员',
        width : 400,
        modal : true,//设置是否是模态窗口,true打开窗口后，其他不能编辑，false，打开后可以编辑
        shadow : true,
        closed : true,//设置窗口默认是打开还是关闭，true-默认关闭，false-默认打开，默认值是false
        height : 400,
        resizable : false
        });

        // 编辑取派员窗口
        $('#editStaffWindow').window({
        title : '编辑取派员',
        width : 400,
        modal : true,//设置是否是模态窗口,true打开窗口后，其他不能编辑，false，打开后可以编辑
        shadow : true,
        closed : true,//设置窗口默认是打开还是关闭，true-默认关闭，false-默认打开，默认值是false
        height : 400,
        resizable : false
        });
        //编辑操作
        $('#edit').click(function(){
        var v = $('#editStaffForm').form('validate');
        if(v){
        //校验通过，提交表单
        $('#editStaffForm').submit();
        }
        });
        //表单验证
        $('#save').click(function(){
        var v = $('#addStaffForm').form('validate');
        if(v){
        //校验通过，提交表单
        $('#addStaffForm').submit();
        }
        });
        //手机号验证
        $.extend($.fn.validatebox.defaults.rules, {
        telephone : {
        validator : function(value, param) {
        var reg = /^1[3,5,7,8,9][0-9]{9}$/;
        return reg.test(value);
        },
        message : '手机号输入错误！'
        }
        });
        });

        function doDblClickRow(rowIndex, rowData) {
        //rowIndex-行索引值，表示是第几行
        //rowData-双击行的行对象
        //打开一个编辑窗口
        $('#editStaffWindow').window('open');
        //将数据回显到form中
        $('#editStaffForm').form("load", rowData);
        }
        </script>
        </head>
        <body class="easyui-layout" style="visibility: hidden;">
        <div region="center" border="false">
        <table id="grid"></table>
        </div>
        <div class="easyui-window" title="对收派员进行添加或者修改" id="addStaffWindow"
        collapsible="false" minimizable="false" maximizable="false"
        style="top: 20px; left: 200px">
        <div region="north" style="height: 31px; overflow: hidden;"
        split="false" border="false">
        <div class="datagrid-toolbar">
        <a id="save" icon="icon-save" href="#" class="easyui-linkbutton"
        plain="true">保存</a>
        </div>
        </div>

        <div region="center" style="overflow: auto; padding: 5px;"
        border="false">
        <form id="addStaffForm" method="post"
        action="${pageContext.request.contextPath }/staffAction_saveStaff.action">
        <table class="table-edit" width="80%" align="center">
        <tr class="title">
        <td colspan="2">收派员信息</td>
        </tr>
        <!-- TODO 这里完善收派员添加 table -->
        <tr>
        <td>姓名</td>
        <td><input type="text" name="name" class="easyui-validatebox"
        required="true" /></td>
        </tr>
        <tr>
        <td>手机</td>
        <td><input type="text" name="telephone"
        class="easyui-validatebox" required="true" data-options="validType:'telephone'"/> <script
        type="text/javascript">
        </script></td>
        </tr>
        <tr>
        <td>单位</td>
        <td><input type="text" name="station"
        class="easyui-validatebox" required="true" /></td>
        </tr>
        <tr>
        <td>邮箱</td>
        <td><input type="text" name="email"
        class="easyui-validatebox" required="true" /></td>
        </tr>
        <tr>
        <td colspan="2"><input type="checkbox" name="haspda"
        value="1" /> 是否有PDA</td>
        </tr>
        <tr>
        <td>取派标准</td>
        <td><input type="text" name="standard"
        class="easyui-validatebox" required="true" /></td>
        </tr>
        </table>
        </form>
        </div>
        </div>

        <div class="easyui-window" title="对收派员进行添加或者修改" id="editStaffWindow"
        collapsible="false" minimizable="false" maximizable="false"
        style="top: 20px; left: 200px">
        <div region="north" style="height: 31px; overflow: hidden;"
        split="false" border="false">
        <div class="datagrid-toolbar">
        <a id="edit" icon="icon-save" href="#" class="easyui-linkbutton"
        plain="true">保存</a>
        </div>
        </div>

        <div region="center" style="overflow: auto; padding: 5px;"
        border="false">
        <form id="editStaffForm" method="post"
        action="${pageContext.request.contextPath }/staffAction_edit.action">
        <table class="table-edit" width="80%" align="center">
        <tr class="title">
        <td colspan="2">收派员信息</td>
        </tr>
        <!-- TODO 这里完善收派员添加 table -->
        <tr>
        <td>姓名
        <!-- 添加主键的隐藏域 -->
        <input type="hidden" name="id"/>
        </td>
        <td><input type="text" name="name" class="easyui-validatebox"
        required="true" /></td>
        </tr>
        <tr>
        <td>手机</td>
        <td><input type="text" name="telephone"
        class="easyui-validatebox" required="true" data-options="validType:'telephone'"/> </td>
        </tr>
        <tr>
        <td>单位</td>
        <td><input type="text" name="station"
        class="easyui-validatebox" required="true" /></td>
        </tr>
        <tr>
        <td>邮箱</td>
        <td><input type="text" name="email"
        class="easyui-validatebox" required="true" /></td>
        </tr>
        <tr>
        <td colspan="2"><input type="checkbox" name="haspda"
        value="1" /> 是否有PDA</td>
        </tr>
        <tr>
        <td>取派标准</td>
        <td><input type="text" name="standard"
        class="easyui-validatebox" required="true" /></td>
        </tr>
        </table>
        </form>
        </div>
        </div>
        </body>
        </html>
