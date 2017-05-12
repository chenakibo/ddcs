package com.imooc.dao.base;

import java.io.Serializable;
import java.util.List;

import org.hibernate.criterion.DetachedCriteria;

/**
 * 抽取持久层通用方法
 * @author chenkaibo
 *
 *@param<T>
 */
public interface IBaseDao<T> {
	
	public void save(T entity);

	public void delete(T entity);
	
	public void update(T entity);
	
	public T findById(Serializable id);
	
	public List<T> findAll();
	
}
