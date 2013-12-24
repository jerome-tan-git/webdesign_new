var selectIndex = -1;
var indexseq = 0;
var nowChecked="";
$( document ).ready( function() {
	attach_event();
	rewrite_no();
	$("#examform").submit(function(){
		    var isFormValid = true;
		    var error_msg = "";
			if($('input[name="right_answer"]:checked').size()==0)
			{
				error_msg +="请选择一个正确答案\n";
				isFormValid = false;
			}
			if($('input[name="question"]').length == 0)
			{
					error_msg +="请输入题目\n";
					isFormValid = false;
			}
			else
			
			if ($('input[name="question"]').val()=="")
			{
					error_msg +="请输入题目\n";
					isFormValid = false;
			}
			if(!isFormValid)
			{
				alert(error_msg);
			}
		    // $(".required input").each(function(){
		        // if ($.trim($(this).val()).length == 0){
		            // $(this).addClass("highlight");
		            // isFormValid = false;
		        // }
		        // else{
		            // $(this).removeClass("highlight");
		        // }
		    // });
// 		
		    // if (!isFormValid) alert("Please fill in all the required fields (indicated by *)");
		
		    return isFormValid;
		});
	$('.expandOption').click(function() {
		var raw_div = $(this).parent().parent().parent();
		var targetHeight = raw_div.find('.option_list').outerHeight();
		var originalHeight = raw_div.find('.options').outerHeight();

		if (originalHeight == 0) {
			raw_div.find('.options').stop(true, true).animate({
				height : targetHeight + "px"
			}, 500, "easeOutExpo");
			$(this).removeClass('glyphicon-chevron-down');
			$(this).addClass('glyphicon-chevron-up');
		} else {
			raw_div.find('.options').stop(true, true).animate({
				height : "0px"
			}, 500, "easeOutExpo");
			$(this).addClass('glyphicon-chevron-down');
			$(this).removeClass('glyphicon-chevron-up');
		}
	});

	$('.exam_type').change(function()
	{
		if($(".exam_type:checked").parent().html().indexOf('是非题')!=-1)
		{
			var ind = numRand();
			$('.all_options').html("<label  class=\"col-sm-12\">选项</label>");
			$('.all_options').append("<div class=\"col-sm-12 col_exam_option\"><div class=\"panel panel-default exam_option \" index='"+ind+"'>"+
			"<div class=\"panel-body\"><input type=\"radio\" class=\"exam_no_\" name=\"right_answer\" value=\"0\"/><span style=\"font-size:15pt;color:#ccc;\">&nbsp;&nbsp;|&nbsp;&nbsp;</span><span class=\"option_text\">是</span><input name=\"refs\" type=\"hidden\"  value=\"1\"/>"+
			"</div></div></div>");
			ind = numRand();
			$('.all_options').append("<div class=\"col-sm-12 col_exam_option\"><div class=\"panel panel-default exam_option \" index='"+ind+"'>"+
			"<div class=\"panel-body\"><input type=\"radio\" class=\"exam_no_\" name=\"right_answer\" value=\"0\"/><span style=\"font-size:15pt;color:#ccc;\">&nbsp;&nbsp;|&nbsp;&nbsp;</span><span class=\"option_text\">否</span><input name=\"refs\" type=\"hidden\"  value=\"0\"/>"+
			"</div></div></div>");
			$('#addOptionbt').attr('disabled','disabled');
			nowChecked='是非题';
		}
		else
		{
			
			if(nowChecked=='是非题')
			{
				//change all option
				$('.all_options').html("<label  class=\"col-sm-12\">选项</label>");
				$('#addOptionbt').removeAttr('disabled');
			}
			else
			{
				//no change on options
				if($(".exam_type:checked").parent().html().indexOf('复选题')!=-1)
				{
					$('input[name="right_answer"]').each(function()
					{
						$(this).attr("type","checkbox");
					});
				}
				else
				{
					$('input[name="right_answer"]').each(function()
					{
						$(this).attr("type","radio");
					});
				}
			}
			if($(".exam_type:checked").parent().html().indexOf('复选题')!=-1)
				{
					nowChecked='复选题';
				}
				else
				{
					nowChecked='单选题';
				}
		}
		rewrite_no();
		attach_event();
	});
	$('.exam_container').hover(function(){
		$(this).addClass('panel-warning');
	},function(){
		$(this).removeClass('panel-warning');
	});
	load_question();
});

 function numRand() {
    var x = 1;
    var y = 100000000;
    var rand = parseInt(Math.random() * (x - y + 1) + y);
    return rand;
}
function attach_event()
{
	$('.exam_option').click(function()
	{
		if($(this).hasClass('panel-danger'))
		{
			$(this).removeClass('panel-danger');
		}
		$('.exam_option').removeClass('panel-primary');
		$(this).addClass('panel-primary');
		put_data($(this));
	});
	$('.exam_option').hover(
		function()
		{
			if(!$(this).hasClass('panel-primary'))
			{
				$(this).addClass('panel-danger');
			}
			
		},
		function()
		{
			$(this).removeClass('panel-danger');
		}
	);
	$('.delete_option').click(function()
	{
		var target_index = $(this).attr("index");
		$('.col_exam_option').each(
			function()
			{
				var this_index = $(this).find('.exam_option').attr("index");
				if (this_index == target_index)
				{
					$(this).remove();
					
				}
				
			}
		);
		rewrite_no();
	});
}


function rewrite_no() {
	var i = 0;
	$(".exam_no_").each(function() {
		$(this).val(i+"");
		i++;
	});

}


function update_data()
{
	var input_x = CKEDITOR.instances.editor.getData();
	input_x = input_x.replace("<p>","").replace("</p>","").replace(/\"/g,"'");
	$('.col_exam_option').each(
		function()
		{
			var this_index = $(this).find('.exam_option').attr("index");
			if (this_index == selectIndex)
			{
				var ind = numRand();
//				$(this).html("<div class=\"panel panel-default exam_option \" index='"+ind+"'>"+
//				"<div class=\"panel-body\"><span class='exam_no_'></span><span class=\"option_text\">"+input_x
//				+"</span><input name=\"refs\" type=\"hidden\"  value=\""+input_x
//				+"\"/>"+
//				"<button type=\"button\" class=\"close delete_option\" aria-hidden=\"true\" index='"+ind
//				+"'>&times;</button></div>"+
//				"</div>");
				$(this).find('.option_text').html(input_x);
				$(this).find('.hiddenText').val(input_x);
				
			}
			
		}
	);
	attach_event();
	rewrite_no();
	CKEDITOR.instances.editor.setData("");
}
function put_data(obj)
{
	var te = obj.find('.option_text').html();
	CKEDITOR.instances.editor.setData(te);
	selectIndex = obj.attr('index');

}
function uploadTitle(obj)
{
	var te = obj.find('.option_text').html();
	CKEDITOR.instances.editor.setData(te);
	$('.exam_option').removeClass('panel-primary');
	selectIndex = -1;
}


function load_question()
{
	
	try
	{
		if(question)
		{
			//alert(question.type);
			$('input[name="e_type"][type="radio"][value="'+question.type+'"]').attr("checked", "checked");
			$('option[class="e_c"][value="'+question.category+'"]').attr("selected", "selected");
			var count = question.options.length;
			var boxType = "checkbox";
			 
			if(question.type=="truefalse" || question.type=="single_selection")
			{
				boxType="radio";
			}
			$('.exam_title_input').html("<label class=\"col-sm-12\">题目</label><div class=\"col-sm-12\" style=\"cursor:pointer\" onclick=\"uploadTitle($(this))\"><div class=\"panel panel-default\">"+
			"<div class=\"panel-body\"><span class=\"option_text\">"+question.question+
			"</span><input name=\"question\" type=\"hidden\"  value=\""+question.question_value+"\"/>"+
			"</div></div>");
			
			for(i=0;i<count;i++)
			{
				var ind = numRand();
				var isChecked="";
				if(question.options[i].right_answer)
				{
					isChecked = "checked";
				}
				$('.all_options').append("<div class=\"col-sm-12 col_exam_option\"><div class=\"panel panel-default exam_option \" index='"+ind+"'>"+
				"<div class=\"panel-body\"><input type=\""+boxType+"\" class=\"exam_no_\" name=\"right_answer\" "+isChecked+"/><span style=\"font-size:15pt;color:#ccc;\">"
				+"&nbsp;&nbsp;|&nbsp;&nbsp;</span><span class=\"option_text\">"+question.options[i].text
				+"</span><input name=\"refs\" type=\"hidden\" class=\"hiddenText\"  value=\""+question.options[i].value+"\"/>"+
				"<button type=\"button\" class=\"close delete_option\" aria-hidden=\"true\" index='"+ind
				+"'>&times;</button></div>"+
				"</div></div>");
			}
		}
		attach_event();
		rewrite_no();
	}
	catch(err){}
	// if(this.hasOwnProperty('question'))
	// {
		// alert(2);
	// }
}
function read_editor()
{
		var ind = numRand();
		var input_x = CKEDITOR.instances.editor.getData();
		var radioType="radio";
		if ($(".exam_type:checked").parent().html().indexOf('复选题') != -1)
		{
			radioType = "checkbox";
		}
		input_x = input_x.replace("<p>","").replace("</p>","").replace(/\"/g,"'");
		$('.all_options').append("<div class=\"col-sm-12 col_exam_option\"><div class=\"panel panel-default exam_option \" index='"+ind+"'>"+
		"<div class=\"panel-body\"><input type=\""+radioType+"\" class=\"exam_no_\" name=\"right_answer\" /><span style=\"font-size:15pt;color:#ccc;\">&nbsp;&nbsp;|&nbsp;&nbsp;</span><span class=\"option_text\">"+input_x
		+"</span><input name=\"refs\" type=\"hidden\" class=\"hiddenText\"  value=\""+input_x+"\"/>"+
		"<button type=\"button\" class=\"close delete_option\" aria-hidden=\"true\" index='"+ind
		+"'>&times;</button></div>"+
		"</div></div>");
		attach_event();
		rewrite_no();
		CKEDITOR.instances.editor.setData("");
}


function read_editor_title()
{

		var input_x = CKEDITOR.instances.editor.getData();
		input_x = input_x.replace("<p>","").replace("</p>","").replace(/\"/g,"'");
		$('.exam_title_input').html("<label class=\"col-sm-12\">题目</label><div class=\"col-sm-12\" style=\"cursor:pointer\" onclick=\"uploadTitle($(this))\"><div class=\"panel panel-default\">"+
		"<div class=\"panel-body\"><span class=\"option_text\">"+input_x+
		"</span><input name=\"question\" type=\"hidden\"  value=\""+input_x+"\"/>"+
		"</div></div>");
		attach_event();
		CKEDITOR.instances.editor.setData("");

}

