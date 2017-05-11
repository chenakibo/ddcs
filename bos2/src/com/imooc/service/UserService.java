package com.imooc.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.imooc.dao.UserDao;
import com.imooc.entity.LoginUser;
import com.imooc.entity.User;
import com.imooc.util.MD5Utils;

/**
 * 用户业务逻辑的实现类
 * @author 陈凯勃
 *
 */
@Service
@Transactional
public class UserService implements IUserService{

	//注入UserDao
	@Autowired
	private UserDao userDao;
	//用户注册的方法
	public boolean register(User user) {
		// TODO 自动生成的方法存根
		System.out.println("UserService中执行了register方法");
		userDao.save(user);
		return true;
	}

	//处理用户登录的方法，在业务逻辑层对查询到的用户对象的密码进行MD5加密
	public User login(LoginUser loginUser){
		User user=userDao.login(loginUser.getUsername(), loginUser.getPassword());
		if(user!=null){
			return user;
		}else{
			return null;
		}
	}
	//用户修改密码的业务逻辑方法
	public boolean editPassword(User user){
		userDao.update(user);
		return true;
	}
}
