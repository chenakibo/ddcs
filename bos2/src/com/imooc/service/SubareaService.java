package com.imooc.service;

import java.util.List;

import org.junit.Test.None;
import org.omg.PortableInterceptor.NON_EXISTENT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.imooc.dao.SubareaDao;
import com.imooc.entity.BcSubarea;
import com.imooc.entity.PageBean;

/**
 * 分区管理的业务逻辑层
 * @author Administrator
 *
 */
@Service
@Transactional
public class SubareaService implements ISubareaService {

	//注入subareaDao
	@Autowired
	private SubareaDao subareaDao;
	public void save(BcSubarea model) {
		 subareaDao.save(model);
	}
	//分页查询的业务逻辑方法
	public void pageQuery(PageBean pageBean) {
		// TODO 自动生成的方法存根
		subareaDao.pageQuery(pageBean);
	}
	public List<BcSubarea> findAll() {
		// TODO 自动生成的方法存根
		return subareaDao.findAll();
	}
	public boolean editSubarea(BcSubarea model) {
		// TODO 自动生成的方法存根
		subareaDao.update(model);
		return true;
	}
	public boolean deleteSubarea(String ids) {
		System.out.println(ids);
		String[] str=ids.split(",");
		for (String string : str) {
			subareaDao.executeUpdate(string, "BcSubarea");
		}
		return true;
	}
	public List<BcSubarea> findByCondition(String condition) {
		String subCondition=condition.substring(0, 2);
		System.out.println(subCondition);
		List<BcSubarea> list=subareaDao.findByCondition(subCondition);
		if(list!=null){
			return list;
		}else{
			return null;
		}
	}
}
