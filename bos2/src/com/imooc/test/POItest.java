package com.imooc.test;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.junit.Test;

public class POItest {

	@Test
	public void test1() throws FileNotFoundException, IOException{
		String file="C:\\Users\\Administrator\\Desktop\\新建文件夹\\day05\\区域导入测试数据.xls";
		//加载Excel文件
		HSSFWorkbook workbook=new HSSFWorkbook(new FileInputStream(file));
		//对去第一个标签页
		HSSFSheet sheet=workbook.getSheetAt(0);
		for (Row row : sheet) {
			for (Cell cell : row) {
				String value=cell.getStringCellValue();
				System.out.print(value+"");
			}
			System.out.println();
		}
	}
}
