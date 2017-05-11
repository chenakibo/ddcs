package com.imooc.service;

import com.imooc.entity.LoginUser;
import com.imooc.entity.User;

/**
 * 用户业务逻辑层接口
 * @author 陈凯勃
 *
 */
public interface IUserService {

	//用户注册的方法
	boolean register(User user);

	boolean editPassword(User loginUser);

	User login(LoginUser model);
}
