package com.imooc.test;

import org.junit.Test;

import com.imooc.util.PinYin4jUtils;

public class PinYin4jTest {

	@Test
	public void test(){
		char s='陈';
		char[] str=PinYin4jUtils.getHeadByChar(s);
		System.out.println(PinYin4jUtils.charArrayToString(str));
	}
}
