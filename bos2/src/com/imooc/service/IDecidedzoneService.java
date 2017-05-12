package com.imooc.service;

import java.util.List;

import com.imooc.entity.BcDecidedzone;
import com.imooc.entity.PageBean;

public interface IDecidedzoneService {

	void pageQuery(PageBean pageBean);

	void save(BcDecidedzone model);

	List<BcDecidedzone> findAll();

	BcDecidedzone findById(String decidedzone_id);

}
