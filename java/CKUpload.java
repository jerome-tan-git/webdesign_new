package com.jerome;

import java.io.File;
import java.io.IOException;
import java.io.Writer;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

/**
 * Servlet implementation class CKUpload
 */
@WebServlet("/CKUpload")
public class CKUpload extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public CKUpload() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("a");
		// TODO Auto-generated method stub
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");  
		response.setCharacterEncoding("UTF-8");
		boolean success = false;
		String imagePath = " ";
        DiskFileItemFactory factory = new DiskFileItemFactory();  
        ServletFileUpload upload = new ServletFileUpload(factory);
        Writer out = response.getWriter();  
        try {  
            List items = upload.parseRequest(request);  
            Iterator itr = items.iterator();  
            while (itr.hasNext()) {  
                FileItem item = (FileItem) itr.next();  
                if (item.isFormField()) {  

                } else {  
                    if (item.getName() != null && !item.getName().equals("")) {  
                    	
                        // item.getName()�����ϴ��ļ��ڿͻ��˵�����·�����  
                        String newFileName = UUID.randomUUID().toString() + "_" + item.getName();
                        
                        File tempFile = new File(newFileName);
                        imagePath = "./ckimages/"+ newFileName;
                        String savePath = this.getServletContext().getRealPath("./ckimages");
                        System.out.println(imagePath);
                        if(!new File(savePath).exists())
                        {
                        	new File(savePath).mkdirs(); 
                        }
                        File file = new File(savePath, tempFile.getName());  
                        item.write(file);  
                        success = true;
                        //out.write("上传成功");
                    } else {
                    	success = false;
                        //out.write("请选择文件");
                    }  
                }  
            }  
        } catch (FileUploadException e) {  
            e.printStackTrace();
            success = false;
        } catch (Exception e) {  
            e.printStackTrace();  
            success = false;
            //out.write("上传失败");
        }  
        finally
        {
        	out.write("<!DOCTYPE html><html><head><meta charset=\"UTF-8\"><title>Insert title here</title>");
        	out.write("<script>");
        	if(success)
        	{
        		out.write("window.parent.CKEDITOR.tools.callFunction("+request.getParameter("CKEditorFuncNum")+",'"+imagePath+"','');");
        	}
        	out.write("</script>");
        	out.write("</head><body>");
        	out.write("hello");
        	out.write("</body></html>");        	    
        	out.flush();
        }
        
	}

}
