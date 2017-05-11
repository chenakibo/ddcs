package com.imooc.web.action;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.ServletOutputStream;

import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;

import org.apache.commons.lang3.StringUtils;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Row;
import org.apache.struts2.ServletActionContext;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.imooc.entity.BcRegion;
import com.imooc.entity.BcSubarea;
import com.imooc.entity.PageBean;
import com.imooc.service.IDecidedzoneService;
import com.imooc.service.ISubareaService;
import com.imooc.service.RegionService;
import com.imooc.util.FileUtils;
import com.imooc.util.PinYin4jUtils;
import com.imooc.web.action.base.BaseAction;

/**
 * 分区管理的action
 * @author Administrator
 *
 */
@Controller
@Scope("prototype")
public class SubareaAction extends BaseAction<BcSubarea> {

	/**
	 * 
	 */
	private static final long serialVersionUID = 4218675102789238396L;

	//注入subareaService
	@Resource
	private ISubareaService subareaService;
	//注入regionService
	@Resource
	private RegionService regionService;
	public String addSubarea(){
		System.out.println(model.getBcRegion());
		subareaService.save(model);
		return "list";
	}
	
	/**
	 * 分页查询
	 * @return
	 */
	public String pageQuery(){
		//1.将分页查询的条件组装到离线查询条件对象
				DetachedCriteria dc = pageBean.getDetachedCriteria();
				//2.组装addresskey
				if(StringUtils.isNotBlank(model.getAddresskey())){
					//addresskey不为空，添加到查询对象中
					dc.add(Restrictions.like("addresskey", "%"+model.getAddresskey()+"%"));
				}
				//3.组装region中的数据
				BcRegion region = model.getBcRegion();
				if(null != region){
					//给region属性起别名
					dc.createAlias("region", "r");
					//说明录入了省或市或区
					String province = region.getProvince();
					if(StringUtils.isNotBlank(province)){
						//province不为空，添加到查询对象中
						dc.add(Restrictions.like("r.province", "%"+province+"%"));
					}
					String city = region.getCity();
					if(StringUtils.isNotBlank(city)){
						//province不为空，添加到查询对象中
						dc.add(Restrictions.like("r.city", "%"+city+"%"));
					}
					String district = region.getDistrict();
					if(StringUtils.isNotBlank(district)){
						//province不为空，添加到查询对象中
						dc.add(Restrictions.like("r.district", "%"+district+"%"));
					}
				}
				//封装数据到pageBean
		subareaService.pageQuery(pageBean);//执行分页查询
		this.writeObject2Json(pageBean, new String[]{ "pageSize", "currentPage", "detachedCriteria", "bcSubareas" });
		return NONE;
	}
	/**
	 * 导入方法
	 * @return
	 */
	//获取subareaFile
	private File subareaFile;
	
	public void setSubareaFile(File subareaFile) {
		this.subareaFile = subareaFile;
	}

	public String importXls(){
		try {
			//1.读取整个excel文件
 			HSSFWorkbook wb = new HSSFWorkbook(
					new FileInputStream(subareaFile));
			//2.读取一个sheet页
			HSSFSheet sheet = wb.getSheetAt(0);
			//3.循环读取每一行
			int index = 0;
			for(Row row : sheet){
				//不读取标题
				if(index == 0){
					index++;
					continue;
				}
				//4.获取每一列数据
				String id = row.getCell(0).getStringCellValue();
				String region_id = row.getCell(1).getStringCellValue();
				String addresskey = row.getCell(2).getStringCellValue();
				String startnum = row.getCell(3).getStringCellValue();
				String endnum = row.getCell(4).getStringCellValue();
				String single = row.getCell(5).getStringCellValue();
				String position = row.getCell(6).getStringCellValue();
				//5.创建region对象，封装数据
				BcRegion region=regionService.findById(region_id);
				BcRegion region2=new BcRegion();
				if(region!=null){
					region2=region;
				}else{
					region2=null;
				}
				BcSubarea subarea=new BcSubarea(id,null,region2, addresskey, startnum, endnum, single, position);
				if(subarea!=null&&StringUtils.isNotBlank(subarea.getId())){
					subareaService.save(subarea);
				}
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		return "list";
	}
	/**
	 * 导出excel
	 * @return
	 */
	public String exportXls(){
		//2.action接收请求
		//1）查询出所有数据
		List<BcSubarea> list = subareaService.findAll();
		//2）创建excel:POI
		//a)创建整个空excel文件
		HSSFWorkbook wb = new HSSFWorkbook();
		//b)创建空sheet页
		HSSFSheet sheet = wb.createSheet();
		//c)创建标题行：第一行，下标从0开始
		HSSFRow row = sheet.createRow(0);
		//d)创建标题列
		row.createCell(0).setCellValue("分区编号");
		row.createCell(1).setCellValue("区域编号");
		row.createCell(2).setCellValue("关键字");
		row.createCell(3).setCellValue("位置信息");
		//3）将数据放如excel中
		if(null != list && list.size() > 0){
			//有数据，循环存放
			int index = 1;
			for(BcSubarea subarea : list){
				//创建新行和新列，赋值
				row = sheet.createRow(index++);
				row.createCell(0).setCellValue(subarea.getId());
				row.createCell(1).setCellValue((null != subarea.getBcRegion()?subarea.getBcRegion().getId():""));
				row.createCell(2).setCellValue(subarea.getAddresskey());
				row.createCell(3).setCellValue(subarea.getPosition());
			}
		}
		//4）将excel返回到前台，已下载的方式打开
		String filename = "分区数据.xls";
		//从request中获取浏览器类型
		String agent = request.getHeader("User-Agent");
		try {
			//两个头之一：content-type:设置返回的数据类型
			String mimeType = ServletActionContext
					.getServletContext().getMimeType(filename);
			filename = FileUtils.encodeDownloadFilename(filename, agent);
			//a)一个流两个头
			//一个流：response输出流
			ServletOutputStream os = ServletActionContext
					.getResponse().getOutputStream();
			ServletActionContext.getResponse().setContentType(mimeType);
			//两个头之二：content-disposition:告诉浏览器以什么方法打开文件
			ServletActionContext.getResponse().setHeader("content-disposition", "attachment;filename="+filename);
			
			//5）通过POI将excel返回到前台
			wb.write(os);
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		return NONE;
	}
	
	/*
	 * 编辑分区对象的方法
	 */
	public String editSubarea(){
		boolean flag=subareaService.editSubarea(model);
		if(flag){
			return "list";
		}else{
			return NONE;
		}
	}
	/*
	 * 删除分区对象的方法
	 */
	//获取ids
	private String ids;
	public void setIds(String ids) {
		this.ids = ids;
	}
	public String deleteSubarea() throws IOException{
		boolean flag=subareaService.deleteSubarea(ids);
		if(flag){
			response.getWriter().print(flag);
			return NONE;
		}
		return null;
	}
	
	/*
	 * 通过定区信息模糊查询关联的分区信息
	 */
	//获取要进行模糊查询的查询条件
	private String condition;
	
	public void setCondition(String condition) {
		this.condition = condition;
	}
	public String linkSubarea() throws UnsupportedEncodingException{
		System.out.println(condition);
		String con=URLDecoder.decode(condition, "utf-8");
		List<BcSubarea> list=subareaService.findByCondition(con);
		this.writeListToJson(list);
		return NONE;
	}
}
