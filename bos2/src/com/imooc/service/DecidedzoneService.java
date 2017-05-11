package com.imooc.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.imooc.dao.DecidedzoneDao;
import com.imooc.entity.BcDecidedzone;
import com.imooc.entity.PageBean;

/**
 * @author Administrator
 *定区管理的业务逻辑层
 */
@Service
@Transactional
public class DecidedzoneService implements IDecidedzoneService {

	//注入dao层
	@Autowired
	private DecidedzoneDao decidedzoneDao;
	public void pageQuery(PageBean pageBean) {
		// TODO 自动生成的方法存根
		decidedzoneDao.pageQuery(pageBean);
	}
	public void save(BcDecidedzone model) {
		decidedzoneDao.save(model);
	}
	public List<BcDecidedzone> findAll() {
		List<BcDecidedzone> list=decidedzoneDao.findAll();
		return list;
	}
	public BcDecidedzone findById(String decidedzone_id) {
		
		return decidedzoneDao.findById(decidedzone_id);
	}

}
