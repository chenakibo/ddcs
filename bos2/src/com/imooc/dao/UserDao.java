package com.imooc.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.imooc.dao.impl.BaseDaoImpl;
import com.imooc.entity.User;
@Repository
public class UserDao extends BaseDaoImpl<User>{

	@Override
	public void save(User entity) {
		// TODO 自动生成的方法存根
		System.out.println("UserDao中执行了save方法");
		super.save(entity);
	}

	//通过用户名和密码查询用户对象的方法，若通过登录页面传入的用户名和密码可以查到用户，则表示数据库中存在该用户
	public User login(String username,String password){
		//hql语句
		String hql="from User where username=? and password=?";
		@SuppressWarnings("unchecked")
		List<User> list=(List<User>) this.getHibernateTemplate().find(hql, username,password);
		System.out.println(list.size());
		if(list.size()!=0){
			User user=list.get(0);
			System.out.println("DAO:"+user.getUsername()+"----"+user.getPassword());
			return user;
		}else{
			return null;
		}
		
	}
}
