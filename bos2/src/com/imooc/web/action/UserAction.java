package com.imooc.web.action;

import java.io.IOException;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.imooc.entity.LoginUser;
import com.imooc.entity.User;
import com.imooc.service.IUserService;
import com.imooc.service.UserService;
import com.imooc.web.action.base.BaseAction;

/**
 * 用户类的web控制层
 * @author Administrator
 *
 */
@Controller
@Scope("prototype")
public class UserAction extends BaseAction<User>{

	/**
	 * 
	 */
	private static final long serialVersionUID = 4096700522371272200L;
	//注入UserService
	@Resource
	private IUserService userService;
	//用户注册的action
	public String register(){
		boolean flag=userService.register(model);
		if(flag){
			session.put("registerMessage", "注册成功");
			return "login";
		}else{
			session.put("registerMessage", "注册失败");
			return "register";
		}
	}
	//用于修改密码的action
	public String editPassword() throws IOException{
		//获取当前的登录用户对象
		User loginUser=(User) session.get("loginUser");
		//获取ajax发送的新密码
		String newPasswordString=request.getParameter("newPassword");
		if(loginUser!=null&newPasswordString!=null){
			boolean flag=userService.editPassword(loginUser);
			if(flag){
				response.getWriter().print(flag);
			}
		}
		return null;
	}
}
