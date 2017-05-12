package com.imooc.service;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.imooc.dao.StaffDao;
import com.imooc.entity.BcStaff;
import com.imooc.entity.PageBean;

/**
 * 取派员管理的业务逻辑层
 * @author Administrator
 *
 */
@Service
@Transactional
public class StaffService implements IStaffService{

	//注入staffService
	@Autowired
	private StaffDao staffDao;
	//实现保存取派员信息的方法
	public boolean save(BcStaff staff) {
		boolean flag=staffDao.saveStaff(staff);
		return false;
	}
	
	//提供分页查询方法
	public void pageQuery(PageBean pageBean){
		staffDao.pageQuery(pageBean);
	}
	
	//取派员批量删除的方法
	public void deleteBatch(String ids){
		if(StringUtils.isNotBlank(ids)){
			String[] staffId=ids.split(",");
			for (String id : staffId) {
				staffDao.executeUpdate(id,"BcStaff");
			}
		}
	}

	/**
	 * 通过id获取对象的方法
	 */
	public BcStaff findById(String id) {
		BcStaff staff=staffDao.findById(id);
		return staff;
	}

	/**
	 * 更新对象的方法
	 */
	public void update(BcStaff bcStaff) {
        staffDao.update(bcStaff);		
	}

	public List<BcStaff> staffToCombobox() {
		List<BcStaff> list=staffDao.findAll();
		if(list.size()>0){
			return list;
		}else{
			return null;
		}
	}
}
