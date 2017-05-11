package com.imooc.util;

import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

/**
 * 获取页面当前用户的工具类
 * @author Administrator
 *
 */
public class LoginUserUtil {

	//获取session的方法
	public static HttpSession getSession(){
		return ServletActionContext.getRequest().getSession();
	}
}
