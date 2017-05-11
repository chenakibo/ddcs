package com.imooc.dao.impl;

import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.List;

import javax.annotation.Resource;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Projections;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import com.imooc.dao.base.IBaseDao;
import com.imooc.entity.PageBean;

/**
 * 持久层通用实现
 * @author chenkaibo
 *
 * @param <T>
 */
public class BaseDaoImpl<T> extends HibernateDaoSupport implements IBaseDao<T> {
	
	private Class<T> entityClass;//代表操作的实体的类型
	//提供一个setMySessionFactory的方法，向父类HibernateDaoSupport中注入sessionFactory
	@Autowired
	public void setMySessionFactory(SessionFactory sessionFactory){
		 super.setSessionFactory(sessionFactory);
	}
	//在构造方法中动态获取当前操作的实体类型
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public BaseDaoImpl(){
		//获取父类的类型
		ParameterizedType genericSuperclass=(ParameterizedType) this.getClass().getGenericSuperclass();
		//获得父类上声明的泛型的数组
		Type[] actualTypeArguments=genericSuperclass.getActualTypeArguments();
		entityClass=(Class) actualTypeArguments[0];
	}

	public void save(T entity) {
		// TODO 自动生成的方法存根
		System.out.println("BaseDaoImpl中执行了save方法");
		this.getHibernateTemplate().save(entity);
	}

	public void delete(T entity) {
		// TODO 自动生成的方法存根
		this.getHibernateTemplate().delete(entity);
	}

	public void update(T entity) {
		// TODO 自动生成的方法存根
		System.out.println("执行了upload方法");
		this.getHibernateTemplate().update(entity);
	}

	public T findById(Serializable id) {
		// TODO 自动生成的方法存根
		return (T)this.getHibernateTemplate().get(entityClass, id);
	}

	@SuppressWarnings("unchecked")
	public List<T> findAll() {
		// TODO 自动生成的方法存根
		String hql="FROM "+entityClass.getSimpleName();
		return (List<T>)this.getHibernateTemplate().find(hql);
	}
	
	//分页查询的方法
		public void pageQuery(PageBean pageBean) {
			DetachedCriteria dc = pageBean.getDetachedCriteria();//获取离线查询条件对象
			//1.查询总条数
			//1.1修改hibernate发送SQL的格式：从select * from Staff修改成select count(*) from Staff
			dc.setProjection(Projections.rowCount());
			List<Long> totalList = (List<Long>) this.getHibernateTemplate().findByCriteria(dc);
			//1.2将total封装到pageBean
			pageBean.setTotal(totalList.get(0).intValue());
			//2.查询每页的具体数据列表
			//2.1恢复hibernate发送SQL的格式：从select count(*) from Staff恢复成select * from Staff
			dc.setProjection(null);
			int currentPage = pageBean.getCurrentPage();
			int pageSize = pageBean.getPageSize();
			
			int firstResult = (currentPage - 1) * pageSize;//从第几条开始查询
			int maxResults = pageSize;//最多查询多少条
			List<?> rows = this.getHibernateTemplate().findByCriteria(dc, firstResult, maxResults);
			//2.2将返回的数据封装到pageBean
			pageBean.setRows(rows);
		}
		
		/**
		 * 通过id删除方法
		 */
		public void executeUpdate(String id,String entityName){
			String hql="delete from "+entityName+" where id=?";
			System.out.println(hql);
			Session session=this.getSession();
			Query query=session.createQuery(hql);
			query.setString(0, id);
			query.executeUpdate();
		}
	}
