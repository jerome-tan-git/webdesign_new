package com.jerome;

import java.io.File;
import java.io.PrintWriter;
import java.util.Date;
import java.util.UUID;

import org.apache.commons.io.FileUtils;
import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

public class CKEUpload extends ActionSupport {
	private String contentType = "text/html;charset=utf-8";
	private File upload; // 上传的文件
	private String uploadFileName; // 文件名称
	private String uploadContentType; // 文件类型
	private String CKEditorFuncNum;
	public File getUpload() {
		return upload;
	}

	public String getCKEditorFuncNum() {
		return CKEditorFuncNum;
	}

	public void setCKEditorFuncNum(String cKEditorFuncNum) {
		CKEditorFuncNum = cKEditorFuncNum;
	}

	public void setUpload(File upload) {
		this.upload = upload;
	}

	public String getUploadFileName() {
		return uploadFileName;
	}

	public void setUploadFileName(String uploadFileName) {
		this.uploadFileName = uploadFileName;
	}

	public String getUploadContentType() {
		return uploadContentType;
	}

	public void setUploadContentType(String uploadContentType) {
		this.uploadContentType = uploadContentType;
	}

	public void myExecute() throws Exception {
		String realpath = ServletActionContext.getServletContext().getRealPath(
				"./ckuploadimages");
		ServletActionContext.getResponse().setContentType(contentType);
		PrintWriter out = ServletActionContext.getResponse().getWriter();
		// D:\apache-tomcat-6.0.18\webapps\struts2_upload\images
		System.out.println("realpath: " + realpath);
		String imagePath = "";
		boolean success = false;
		try
		{
		if (upload != null) {
			File savefile = new File(new File(realpath), UUID.randomUUID()
					.toString()
					+ "_"
					+ java.net.URLEncoder.encode(uploadFileName, "UTF-8"));
			if (!savefile.getParentFile().exists())
				savefile.getParentFile().mkdirs();
			FileUtils.copyFile(upload, savefile);
			imagePath = "./ckuploadimages/"+savefile.getName();
			System.out.println(imagePath);
			success = true;

		}
		}
		catch(Exception e)
		{
			success = false;
		}
		out.write("<!DOCTYPE html><html><head><meta charset=\"UTF-8\"><title>Insert title here</title>");
    	out.write("<script>");
   		out.write("window.parent.CKEDITOR.tools.callFunction("+CKEditorFuncNum+",'"+imagePath+"','');");
    	out.write("</script>");
    	out.write("</head><body>");
    	out.write("</body></html>");        	    
    	out.flush();
	}
}
