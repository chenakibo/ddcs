package com.imooc.dao;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Projections;
import org.springframework.stereotype.Repository;

import com.imooc.dao.impl.BaseDaoImpl;
import com.imooc.entity.BcRegion;
import com.imooc.entity.PageBean;
import com.imooc.util.PinYin4jUtils;

/**
 * 区域管理的dao层
 * @author Administrator
 *
 */
@Repository
public class RegionDao extends BaseDaoImpl<BcRegion> {

	public void saveBatch(List<BcRegion> list) {
		// TODO 自动生成的方法存根
		for (BcRegion bcRegion : list) {
			this.getHibernateTemplate().save(bcRegion);
		}
	}

	//根据q进行模糊查询
	public List<BcRegion> findByQ(String q) {
		String hql="from BcRegion r where r.shortcode like ? or r.citycode like ?";
		List<BcRegion> list=(List<BcRegion>)this.getHibernateTemplate().find(hql, "%"+q+"%","%"+q+"%");
		List<BcRegion> district=new ArrayList<BcRegion>();
		for(BcRegion region:list){
			BcRegion disRegion=new BcRegion(region.getId(), region.getDistrict());
			district.add(disRegion);
		}
		return district;
	}

	//删除对象的方法
	/**
	 * 通过id删除方法
	 */

}
