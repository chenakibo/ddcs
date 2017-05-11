<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>区域设置</title>
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
<script src="${pageContext.request.contextPath }/js/easyui/outOfBounds.js" type="text/javascript"></script>	
<script type="text/javascript">
	function doAdd(){
		$('#addRegionWindow').window("open");
	}
	
	function doView(){
		var row=$("#grid").datagrid("getSelected");
		if(row==null){
		   $.messager.alert("提示信息","请选择要修改的条目","warning");
		}else{
		$('#editRegionWindow').window('open');
		//将数据回显到form中
		$('#editRegionForm').form("load", row);
		}
	}
	
	function doDelete(){
		//获取选中的条数
		var rows=$("#grid").datagrid("getSelections");
		if(rows.length<=0){
		//如果未选中条目
		   $.messager.alert('提示信息', '请您选择要删除的数据！', 'warning');
		}else{
		   //如果选中，获取选中的id，向后台发送删除请求
		   var regionIdArray=new Array();
		   for(var i=0;i<rows.length;i++){
		       regionIdArray.push(rows[i].id);
		   }
		   //将获取到的id转化为字符串
		   var ids=regionIdArray.join(",");
		   //将请求发送给后端
		   location.href="${pageContext.request.contextPath }/regionAction_deleteRegion.action?ids="+ids;
		}
	}
	
	//工具栏
	var toolbar = [ {
		id : 'button-edit',	
		text : '修改',
		iconCls : 'icon-edit',
		handler : doView
	}, {
		id : 'button-add',
		text : '增加',
		iconCls : 'icon-add',
		handler : doAdd
	}, {
		id : 'button-delete',
		text : '删除',
		iconCls : 'icon-cancel',
		handler : doDelete
	}, {
		id : 'button-import',
		text : '导入',
		iconCls : 'icon-redo'
	}];
	// 定义列
	var columns = [ [ {
		field : 'id',
		checkbox : true,
	},{
		field : 'province',
		title : '省',
		width : 120,
		align : 'center'
	}, {
		field : 'city',
		title : '市',
		width : 120,
		align : 'center'
	}, {
		field : 'district',
		title : '区',
		width : 120,
		align : 'center'
	}, {
		field : 'postcode',
		title : '邮编',
		width : 120,
		align : 'center'
	}, {
		field : 'shortcode',
		title : '简码',
		width : 120,
		align : 'center'
	}, {
		field : 'citycode',
		title : '城市编码',
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
			border : false,
			rownumbers : true,
			striped : true,
			pageList: [30,50,100],
			pagination : true,
			toolbar : toolbar,
			url : "${pageContext.request.contextPath }/regionAction_pageQuery.action",
			idField : 'id',
			columns : columns,
			onDblClickRow : doDblClickRow
		});
		
		// 添加、修改区域窗口
		$('#addRegionWindow').window({
	        title: '添加修改区域',
	        width: 400,
	        modal: true,
	        shadow: true,
	        closed: true,
	        height: 400,
	        resizable:false
	    });
	    // 添加、修改区域窗口
		$('#editRegionWindow').window({
	        title: '添加修改区域',
	        width: 400,
	        modal: true,
	        shadow: true,
	        closed: true,
	        height: 400,
	        resizable:false
	    });
        $("#button-import").upload({
            name:"regionFile",
            action:"${pageContext.request.contextPath }/regionAction_importXls.action"
        });
        //保存按钮的表单提交
       //表单验证
		$('#save').click(function(){
						var v = $('#addRegionForm').form('validate');
						if(v){
							//校验通过，提交表单
							$('#addRegionForm').submit();
						}
					});		
		//编辑操作的提交
		$("#edit").click(function(){
		     var v = $('#editRegionForm').form('validate');
						if(v){
							//校验通过，提交表单
							$('#editRegionForm').submit();
						}
		});			
	});

	function doDblClickRow(){
		//rowIndex-行索引值，表示是第几行
		//rowData-双击行的行对象
		//打开一个编辑窗口
		$('#editRegionWindow').window('open');
		//将数据回显到form中
		$('#editRegionForm').form("load", rowData);
	}
</script>	
</head>
<body class="easyui-layout" style="visibility:hidden;">
	<div region="center" border="false">
    	<table id="grid"></table>
	</div>
	<div class="easyui-window" title="区域添加修改" id="addRegionWindow" collapsible="false" minimizable="false" maximizable="false" style="top:20px;left:200px">
		<div region="north" style="height:31px;overflow:hidden;" split="false" border="false" >
			<div class="datagrid-toolbar">
				<a id="save" icon="icon-save" href="#" class="easyui-linkbutton" plain="true" >保存</a>
			</div>
		</div>
		
		<div region="center" style="overflow:auto;padding:5px;" border="false">
			<form id="addRegionForm"  action="${pageContext.request.contextPath }/regionAction_saveRegion.action" method="post">
				<table class="table-edit" width="80%" align="center">
					<tr class="title">
						<td colspan="2">区域信息</td>
					</tr>
					<tr>
						<td>省</td>
						<td><input type="text" name="province" class="easyui-validatebox" required="true"/></td>
					</tr>
					<tr>
						<td>市</td>
						<td><input type="text" name="city" class="easyui-validatebox" required="true"/></td>
					</tr>
					<tr>
						<td>区</td>
						<td><input type="text" name="district" class="easyui-validatebox" required="true"/></td>
					</tr>
					<tr>
						<td>邮编</td>
						<td><input type="text" name="postcode" class="easyui-validatebox" required="true"/></td>
					</tr>
					<tr>
						<td>简码</td>
						<td><input type="text" name="shortcode" class="easyui-validatebox" required="true"/></td>
					</tr>
					<tr>
						<td>城市编码</td>
						<td><input type="text" name="citycode" class="easyui-validatebox" required="true"/></td>
					</tr>
					</table>
			</form>
		</div>
	</div>
	<div class="easyui-window" title="区域添加修改" id="editRegionWindow" collapsible="false" minimizable="false" maximizable="false" style="top:20px;left:200px">
		<div region="north" style="height:31px;overflow:hidden;" split="false" border="false" >
			<div class="datagrid-toolbar">
				<a id="edit" icon="icon-save" href="#" class="easyui-linkbutton" plain="true" >保存</a>
			</div>
		</div>
		
		<div region="center" style="overflow:auto;padding:5px;" border="false">
			<form id="editRegionForm"  action="${pageContext.request.contextPath }/regionAction_editRegion.action" method="post">
				<table class="table-edit" width="80%" align="center">
					<tr class="title">
						<td colspan="2">区域信息</td>
					</tr>
					<tr>
						<td>省</td>
						<td><input type="text" name="province" class="easyui-validatebox" required="true"/></td>
					</tr>
					<tr>
						<td>市</td>
						<td><input type="text" name="city" class="easyui-validatebox" required="true"/></td>
					</tr>
					<tr>
						<td>区</td>
						<td><input type="text" name="district" class="easyui-validatebox" required="true"/></td>
					</tr>
					<tr>
						<td>邮编</td>
						<td><input type="text" name="postcode" class="easyui-validatebox" required="true"/></td>
					</tr>
					<tr>
						<td>简码</td>
						<td><input type="text" name="shortcode" class="easyui-validatebox" required="true"/></td>
					</tr>
					<tr>
						<td>城市编码</td>
						<td><input type="text" name="citycode" class="easyui-validatebox" required="true"/></td>
					</tr>
					</table>
			</form>
		</div>
	</div>
</body>
</html>