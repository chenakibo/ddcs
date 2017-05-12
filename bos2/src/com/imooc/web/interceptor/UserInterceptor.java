package com.imooc.web.interceptor;

import com.imooc.entity.User;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.AbstractInterceptor;

/**
 * 用于判断用户是否已登录的拦截器
 * @author Administrator
 *
 */
public class UserInterceptor extends AbstractInterceptor {

	/**
	 * 
	 */
	private static final long serialVersionUID = 733695947784605993L;

	@Override
	public String intercept(ActionInvocation arg0) throws Exception {
	    //session中获取用户对象
		User user=(User) ActionContext.getContext().getSession().get("loginUser");
		System.out.println("执行了拦截器");
		if(user!=null){
			String result=arg0.invoke();
			result="home";
			return result;
		}else{
			return "login";
		}
	}

}
