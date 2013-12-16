var selectIndex = -1;
var indexseq = 0;
$( document ).ready( function() {
	attach_event();
	
	
	$('.exam_type').change(function()
	{
		if($(".exam_type:checked").parent().html().indexOf('是非题')!=-1)
		{
			var ind = numRand();
			$('.all_options').html("<label  class=\"col-sm-12\">选项</label>");
			$('.all_options').append("<div class=\"col-sm-12 col_exam_option\"><div class=\"panel panel-default exam_option \" index='"+ind+"'>"+
			"<div class=\"panel-body\"><span class='exam_no_'></span><span class=\"option_text\">是</span><input name=\"real_option_text\" type=\"hidden\"  value=\"是\"/>"+
			"</div></div></div>");
			ind = numRand();
			$('.all_options').append("<div class=\"col-sm-12 col_exam_option\"><div class=\"panel panel-default exam_option \" index='"+ind+"'>"+
			"<div class=\"panel-body\"><span class='exam_no_'></span><span class=\"option_text\">否</span><input name=\"real_option_text\" type=\"hidden\"  value=\"是\"/>"+
			"</div></div></div>");
		}
		else
		{
			$('.all_options').html("<label  class=\"col-sm-12\">选项</label>");
		}
		rewrite_no();
		attach_event();
	});
	
	
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

function rewrite_no()
{
	var i = 0;
	$(".exam_no_").each(function()
	{
		i++;
		$(this).html(i+"&nbsp;&nbsp;|&nbsp;&nbsp;");
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
				$(this).html("<div class=\"panel panel-default exam_option \" index='"+ind+"'>"+
				"<div class=\"panel-body\"><span class='exam_no_'></span><span class=\"option_text\">"+input_x+"</span><input name=\"real_option_text\" type=\"hidden\"  value=\""+input_x+"\"/>"+
				"<button type=\"button\" class=\"close delete_option\" aria-hidden=\"true\" index='"+ind+"'>&times;</button></div>"+
				"</div>");
				
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
function read_editor()
{
		var ind = numRand();
		var input_x = CKEDITOR.instances.editor.getData();
		input_x = input_x.replace("<p>","").replace("</p>","").replace(/\"/g,"'");
		$('.all_options').append("<div class=\"col-sm-12 col_exam_option\"><div class=\"panel panel-default exam_option \" index='"+ind+"'>"+
		"<div class=\"panel-body\"><span class='exam_no_'></span><span class=\"option_text\">"+input_x+"</span><input name=\"real_option_text\" type=\"hidden\"  value=\""+input_x+"\"/>"+
		"<button type=\"button\" class=\"close delete_option\" aria-hidden=\"true\" index='"+ind+"'>&times;</button></div>"+
		"</div></div>");
		attach_event();
		rewrite_no();
		CKEDITOR.instances.editor.setData("");
}


function read_editor_title()
{

		var input_x = CKEDITOR.instances.editor.getData();
		input_x = input_x.replace("<p>","").replace("</p>","").replace(/\"/g,"'");
		$('.exam_title_input').html("<label  class=\"col-sm-12\">题目</label><div class=\"col-sm-12\"><div class=\"panel panel-default\">"+
		"<div class=\"panel-body\"><span class=\"option_text\">"+input_x+"</span><input name=\"real_option_text\" type=\"hidden\"  value=\""+input_x+"\"/>"+
		
		"</div></div>");
		attach_event();
		CKEDITOR.instances.editor.setData("");

}


/**
 
<div class="col-sm-12">
	<div class="panel panel-default exam_option ">
	  <div class="panel-body">
		<span class="option_text">选项选项选项选项选项选项选项选项选项选项</span>
		<button type="button" class="close" aria-hidden="true">&times;</button>
		</div>
	</div>
</div> 
 */