package com.imooc.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.imooc.dao.RegionDao;
import com.imooc.entity.BcRegion;
import com.imooc.entity.PageBean;

/**
 * 区域管理的业务逻辑层
 * @author Administrator
 *
 */
@Service
@Transactional
public class RegionService {

	//注入regionDao
	@Autowired
	private RegionDao regionDao;
	public void saveBatch(List<BcRegion> list) {
		regionDao.saveBatch(list);
	}

	public List<BcRegion> findByQ(String q) {
		// TODO 自动生成的方法存根
		return regionDao.findByQ(q);
	}

	public List<BcRegion> findAll() {
		// TODO 自动生成的方法存根
		return regionDao.findAll();
	}

	public void pageQuery(PageBean pageBean) {
		//提供分页查询方法
		regionDao.pageQuery(pageBean);
	}

	//保存区域对象的业务逻辑层
	public boolean save(BcRegion model) {
		regionDao.save(model);
		return true;
	}

	//删除选中条目的业务逻辑
	public boolean delete(String ids) {
		//将ids字符串转化为id
		System.out.println(ids);
		String[] idArray=ids.split(",");
		//再调用dao层的删除方法
	   for (String string : idArray) {
		regionDao.executeUpdate(string, "BcRegion");
	}
		return true;
	}

	public BcRegion findById(String region_id) {
		BcRegion region=new BcRegion();
		region=regionDao.findById(region_id);
		if(region!=null){
			return region;
		}else{
			return region;
		}
	}

}
