package com.imooc.test;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.imooc.dao.impl.BaseDaoImpl;
import com.imooc.entity.BcRegion;
import com.imooc.entity.BcSubarea;
import com.imooc.service.ISubareaService;
import com.imooc.service.RegionService;

@ContextConfiguration("classpath:applicationContext*.xml")
@RunWith(SpringJUnit4ClassRunner.class)
public class TestDemo extends BaseDaoImpl<BcSubarea> {

	@Autowired
	private ApplicationContext applicationContext;
	@Test
	public void test(){
		ISubareaService service=(ISubareaService) applicationContext.getBean("subareaService");
		System.out.println(service.findByCondition("朝阳"));
	}
}
