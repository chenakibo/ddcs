package com.imooc.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.imooc.dao.impl.BaseDaoImpl;
import com.imooc.entity.BcSubarea;
@Repository
public class SubareaDao extends BaseDaoImpl<BcSubarea> {

	public List<BcSubarea> findByCondition(String condition) {
		String hql="from BcSubarea b where b.position like ?";
		List<BcSubarea> list=this.getHibernateTemplate().find(hql, "%"+condition+"%");
		return list;
	}


}
