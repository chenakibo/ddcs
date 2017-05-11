package com.imooc.web.action;

import java.io.IOException;
import java.util.List;

import javax.annotation.Resource;

import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;

import org.hibernate.criterion.DetachedCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.imooc.entity.BcStaff;
import com.imooc.entity.PageBean;
import com.imooc.service.IStaffService;
import com.imooc.web.action.base.BaseAction;

/**
 * 取派员管理的action
 * @author Administrator
 *
 */
@Controller
@Scope("prototype")
public class StaffAction extends BaseAction<BcStaff> {

	/**
	 * 
	 */
	private static final long serialVersionUID = -7981183898401172432L;
	//注入staffService
	@Resource
	private IStaffService staffService;
	//用于保存取派员对象的action
	public String saveStaff(){
		boolean flag=staffService.save(model);
		if(flag){
			return "list";
		}else{
			return null;
		}
	}
	
	//分页查询的action
	//定义属性，接收分页参数
	private int page;
	private int rows;
	/**
	 * 分页查询的方法
	 * @return
	 * @throws IOException 
	 */
	public String pageQuery() throws IOException{
		staffService.pageQuery(pageBean);//执行分页查询
		//使用json-lib将pagebean转化为json数据
		this.writeObject2Json(pageBean, new String[]{"currentPage","pageSize","detachedCriteria","bcDecidedzones"});
		return NONE;
	}
	
	/**
	 * 取派员批量删除的方法
	 * 
	 */
	//接收取派员的ids
	private String ids;
	public void setIds(String ids) {
		this.ids = ids;
	}
	public String delete(){
		System.out.println(ids);
		staffService.deleteBatch(ids);
		return "list";
	}
	
	/**
	 * 编辑取派员信息的action
	 */
	public String edit(){
		//先查询数据库原始数据
		String id=model.getId();
		BcStaff bcStaff=staffService.findById(id);
		//根据页面提交的参数进行覆盖
		bcStaff.setHaspda(model.getHaspda());
		bcStaff.setName(model.getName());
		bcStaff.setStandard(model.getStandard());
		bcStaff.setStation(model.getStation());
		bcStaff.setTelephone(model.getTelephone());
		
		staffService.update(bcStaff);
		return "list";
	}
	
	/*
	 * 可用取派员的关联到combobox中
	 */
	public String staffToCombobox(){
		List<BcStaff> list=staffService.staffToCombobox();
		this.writeList2Json(list, new String[]{"bcDecidedzones"});
		return NONE;
	}
}
