package com.imooc.dao;

import java.io.Serializable;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Projections;
import org.springframework.stereotype.Repository;

import com.imooc.dao.impl.BaseDaoImpl;
import com.imooc.entity.BcStaff;
import com.imooc.entity.PageBean;

/**
 * 取派员管理的dao层
 * @author Administrator
 *
 */
@Repository
public class StaffDao extends BaseDaoImpl<BcStaff> {

	public boolean saveStaff(BcStaff entity) {
		// TODO 自动生成的方法存根
		System.out.println(entity);
		Serializable obj= this.getHibernateTemplate().save(entity);
		if(obj!=null){
			return true;
		}else{
			return false;
		}
	}

}
