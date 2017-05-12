package com.imooc.service;

import java.util.List;

import com.imooc.entity.BcSubarea;
import com.imooc.entity.PageBean;

public interface ISubareaService {

	void save(BcSubarea model);

	void pageQuery(PageBean pageBean);

	List<BcSubarea> findAll();

	boolean editSubarea(BcSubarea model);

	boolean deleteSubarea(String ids);

	List<BcSubarea> findByCondition(String condition);


}
