package com.imooc.service;

import java.util.List;

import com.imooc.entity.BcStaff;
import com.imooc.entity.PageBean;

/**
 * 取派员业务逻辑层的接口
 * @author Administrator
 *
 */
public interface IStaffService {

	//保存取派员信息的方法
	boolean save(BcStaff staff);

	void deleteBatch(String ids);

	BcStaff findById(String id);

	void update(BcStaff bcStaff);

	void pageQuery(PageBean pageBean);

	List<BcStaff> staffToCombobox();
}
