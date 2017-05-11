package com.imooc.web.action;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;

import org.apache.commons.lang3.StringUtils;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Workbook;
import org.hibernate.criterion.DetachedCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.imooc.entity.BcRegion;
import com.imooc.entity.BcStaff;
import com.imooc.entity.PageBean;
import com.imooc.service.RegionService;
import com.imooc.util.PinYin4jUtils;
import com.imooc.web.action.base.BaseAction;

/**
 * 区域管理的action
 * @author Administrator
 *
 */
@Controller
@Scope("prototype")
public class RegionAction extends BaseAction<BcRegion> {

	/**
	 * 
	 */
	private static final long serialVersionUID = 4583085132618212366L;

	//接收上传的文件
	private File regionFile;

	public void setRegionFile(File regionFile) {
		this.regionFile = regionFile;
	}

	//注入regionService
	@Resource
	private RegionService regionService;
	/**
	 * 区域对象添加的方法
	 */
	public String saveRegion(){
		boolean flag=regionService.save(model);
		if(flag){
			System.out.println("执行了删除操作");
			return "list";
		}else{
			return NONE;
		}
	}
	/**
	 * 处理删除的action
	 */
	//获取ids
	private String ids;
	
	public void setIds(String ids) {
		this.ids = ids;
	}
	public String deleteRegion(){
		boolean flag=regionService.delete(ids);
		if(flag){
			return "list";
		}else{
			return NONE;
		}
	}
	/**
	 * 导入方法
	 * @return
	 */
	public String importXls(){
		String flag = "1";
		try {
			//1.读取整个excel文件
			HSSFWorkbook wb = new HSSFWorkbook(
					new FileInputStream(regionFile));
			//2.读取一个sheet页
			HSSFSheet sheet = wb.getSheetAt(0);
			//3.循环读取每一行
			List<BcRegion> list = new ArrayList<BcRegion>();
			int index = 0;
			for(Row row : sheet){
				if(index == 0){
					index++;
					continue;
				}
				//4.获取每一列数据
				String id = row.getCell(0).getStringCellValue();
				String province = row.getCell(1).getStringCellValue();
				String city = row.getCell(2).getStringCellValue();
				String district = row.getCell(3).getStringCellValue();
				String postcode = row.getCell(4).getStringCellValue();
				
				//5.创建region对象，封装数据
				BcRegion region = new BcRegion(id, province, city, district, postcode, null, null,null);
				
				//简码：河北石家庄开发->HBSJZKF
				province = province.substring(0, province.length() - 1);//河北
				city = city.substring(0, city.length() - 1);//石家庄
				district = district.substring(0, district.length() - 1);//开发
				String temp = province + city + district;//河北石家庄开发
				String[] headArr = PinYin4jUtils.getHeadByString(temp);//[H,B,S,J,Z,K,F]
				String shortcode = StringUtils.join(headArr, "");
				region.setShortcode(shortcode);
				
				//城市码：石家庄->shijiazhuang
				String citycode = PinYin4jUtils.hanziToPinyin(city, "");
				region.setCitycode(citycode);
				list.add(region);
			}
			regionService.saveBatch(list);
		} catch (IOException e) {
			flag = "0";
			e.printStackTrace();
		}
		response.setContentType("text/html;charset=utf-8");
		try {
			response.getWriter().print(flag);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "list";
	}
	
		/**
		 * 分页查询的方法
		 * @return
		 * @throws IOException 
		 */
		public String pageQuery() throws IOException{
			regionService.pageQuery(pageBean);//执行分页查询
			//使用json-lib将pagebean转化为json数据
			
		   this.writeObject2Json(pageBean, new String[]{"currentPage","pageSize","detachedCriteria", "bcSubareas" });
			return NONE;
		}
		
		/**
		 * 页面中区域下拉菜单过滤条件
		 */
		private String q;
		
		public void setQ(String q) {
			this.q = q;
		}

		/**
		 * 查询所有区域数据，返回json
		 * @return
		 */
		public String listajax(){
			List<BcRegion> list=new ArrayList<BcRegion>();
			if(StringUtils.isNotBlank(q)){
				//根据过滤条件查询
				System.out.println(q);
				list=regionService.findByQ(q);
			}else{
				//查询所有区域
				List<BcRegion> list2=regionService.findAll();
				for (BcRegion bcRegion : list2) {
					BcRegion region=new BcRegion(bcRegion.getId(), bcRegion.getDistrict());
					list.add(region);
				}
			}
			this.writeListToJson(list);
			return null;
		}
}
