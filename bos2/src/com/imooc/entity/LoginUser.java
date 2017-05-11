package com.imooc.entity;

/**
 * 只包括用户名和密码的用户登录对象的实体类
 * @author Administrator
 *
 */
public class LoginUser {

	private String username;
	private String password;
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
}
