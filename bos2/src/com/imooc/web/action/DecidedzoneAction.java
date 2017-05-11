package com.imooc.web.action;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.imooc.entity.BcDecidedzone;
import com.imooc.service.IDecidedzoneService;
import com.imooc.web.action.base.BaseAction;

/**
 * @author Administrator
 *定区管理的action层
 */
@Controller
@Scope("prototype")
public class DecidedzoneAction extends BaseAction<BcDecidedzone> {

	/**
	 * 
	 */
	private static final long serialVersionUID = -8046714320581132394L;

	//注入service
	@Resource
	private IDecidedzoneService decidedzoneService;
	/*
	 * 分页查询
	 */
	public String pageQuery(){
		//执行分页查询
		List<BcDecidedzone> list=decidedzoneService.findAll();
		//使用json-lib将pagebean转化为json数据
		if(list!=null){
			this.writeList2Json(list, new String[]{"bcSubareas","bcDecidedzones"});
		}
		return null;
	}
	
	/*
	 * 添加定区对象的action
	 */
	public String addDecidedzone(){
		decidedzoneService.save(model);
		return "list";
	}
}
