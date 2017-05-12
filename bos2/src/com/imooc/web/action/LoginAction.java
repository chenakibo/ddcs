package com.imooc.web.action;

import javax.annotation.Resource;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.imooc.entity.LoginUser;
import com.imooc.entity.User;
import com.imooc.service.IUserService;
import com.imooc.service.UserService;
import com.imooc.web.action.base.BaseAction;

/**
 * 处理用户登录的action
 * @author Administrator
 *
 */
@Controller
@Scope("prototype")
public class LoginAction extends BaseAction<LoginUser> {

	/**
	 * 
	 */
	private static final long serialVersionUID = 92948116893627925L;
	//登录页面传入的验证码
	private String volidatecode;
	
	public void setVolidatecode(String volidatecode) {
		this.volidatecode = volidatecode;
	}
	//注入userService
	@Resource
	private IUserService userService;
	//用户登录的action
	public String login(){
		System.out.println("执行了loginAction");
		System.out.println(session.get("key"));
		System.out.println(volidatecode);
		//首先判断验证码是否正确
		if(StringUtils.isNotBlank(volidatecode)&&volidatecode.equals(session.get("key").toString())){
			//验证码正确
			System.out.println(model);
			System.out.println("model:"+model.getUsername());
			
			User user=userService.login(model);
			if(user!=null){
				session.put("loginUser", user);
				return "home";
			}else{
				session.put("errorMessage", "用户名或密码错误");
				return "login";
			}
		}else{
			//验证码错误
			session.put("errorMessage", "验证码错误");
			return "login";
		}
	}
}
