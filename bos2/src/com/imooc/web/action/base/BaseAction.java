package com.imooc.web.action.base;

import java.io.IOException;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.interceptor.SessionAware;
import org.hibernate.criterion.DetachedCriteria;
import org.springframework.http.HttpRequest;

import com.imooc.entity.PageBean;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;

/**
 * 表现层通用实现
 * 
 * @author  chenakibo 
 *
 *@param<T>
 */
public class BaseAction<T> extends ActionSupport implements ModelDriven<T>,SessionAware{

	/**
	 * 
	 */
	private static final long serialVersionUID = -1599956553078038701L;
	
	protected PageBean pageBean = new PageBean();

	public void setPage(int page) {
		pageBean.setCurrentPage(page);
	}

	public void setRows(int rows) {
		pageBean.setPageSize(rows);
	}
	//页面传入的模型
	protected T model;
	public T getModel() {
		// TODO 自动生成的方法存根
		return model;
	}

	//获取集成seeion的map
	protected Map<String,Object> session;
	//获取request
	protected HttpServletRequest request;
	//获取response
	protected HttpServletResponse response;
	//在构造方法中动态获取实体的类型，通过反射创建模型对象
	public BaseAction(){
		//获取父类(BaseAction<T>)的类型
		ParameterizedType genericSuperclass =(ParameterizedType) this.getClass().getGenericSuperclass();
		//获取父类上声明的泛型的数组
		Type[] actualTypeArguments=genericSuperclass.getActualTypeArguments();
		//获取实体类型
		@SuppressWarnings("unchecked")
		Class<T> entityClass=(Class<T>) actualTypeArguments[0];
		DetachedCriteria dc = DetachedCriteria.forClass(entityClass);// 创建离线查询条件对象
		pageBean.setDetachedCriteria(dc);
		try {
			//创建反射模型对象
			model=entityClass.newInstance();
			request=ServletActionContext.getRequest();
			response=ServletActionContext.getResponse();
		} catch (InstantiationException e) {
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		}
	}
	public void setSession(Map<String, Object> arg0) {
		// TODO 自动生成的方法存根
		this.session=arg0;
	}
	
	public void writeObject2Json(Object object, String[] excludes) {
		// 使用jsonlib将pageBean转化成json
		// 转换对象：使用JSONObject 转换对象
		// 转换集合：使用JSONArray转换集合（数组、Collection、List、Set...）
		JsonConfig jsonConfig = new JsonConfig();
		jsonConfig.setExcludes(excludes);
		JSONObject jsonObject = JSONObject.fromObject(object, jsonConfig);
		String json = jsonObject.toString();

		// 使用response将json返回到前台
		ServletActionContext.getResponse().setContentType("text/json;charset=utf-8");
		try {
			System.out.println(json);
			ServletActionContext.getResponse().getWriter().print(json);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public void writeList2Json(List list, String[] excludes) {
		// 使用jsonlib将pageBean转化成json
		// 转换对象：使用JSONObject 转换对象
		// 转换集合：使用JSONArray转换集合（数组、Collection、List、Set...）
		JsonConfig jsonConfig = new JsonConfig();
		jsonConfig.setExcludes(excludes);
		JSONArray jsonArray = JSONArray.fromObject(list, jsonConfig);
		String json = jsonArray.toString();
		// 使用response将json返回到前台
		ServletActionContext.getResponse().setContentType("text/json;charset=utf-8");
		try {
			System.out.println(json);
			ServletActionContext.getResponse().getWriter().print(json);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	public void writeListToJson(List list) {
		// 使用jsonlib将pageBean转化成json
		// 转换对象：使用JSONObject 转换对象
		// 转换集合：使用JSONArray转换集合（数组、Collection、List、Set...）
		JSONArray jsonArray = JSONArray.fromObject(list);
		String json = jsonArray.toString();
		// 使用response将json返回到前台
		ServletActionContext.getResponse().setContentType("text/json;charset=utf-8");
		try {
			System.out.println(json);
			ServletActionContext.getResponse().getWriter().print(json);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
