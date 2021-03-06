function outHtml(obj) {
	return $("<p></p>").append(obj.clone()).html();
}
var loopObj = new Object();

$(document).ready(function() {
	
	getLoopData();
	
		if (form_data.type == "edit") {
			$(".display").remove();
		} else {
			$(".editor").remove();
		}
	
		for (var key in form_data) {
			
			 if ( typeof (form_data[key]) == "object") {
				var container = $('#' + key + '_container');
				var loop_cells = container.find('[form_data="_loop"]');
				var insertHTML = outHtml(loop_cells);
				loop_cells.remove();
				var innerData = form_data[key];
				var dateLen = innerData.length;
				for ( i = 0; i < dateLen; i++) {
					
					container.append(insertHTML);
					var cur_innerData = innerData[i];
					 for (var innerKey in cur_innerData) {
					 	var insertData = cur_innerData[innerKey];
					 	//alert(innerKey + " | "+ insertData);
						 
						  //alert("insertData="+insertData);
						 if(container.find('.display[form_data="' + innerKey + '"]').size()==1)
						 {
							  container.find('.display[form_data="' + innerKey + '"]').html(insertData);
						 }
						 var inputObjs = container.find('.editor[form_data="' + innerKey + '"]');
						 if(inputObjs.size()==1)
						 {
							 // // alert(container.find('.editor[form_data="' + b + '"]').size() + " | " + '.editor[form_data="' + b + '"]');
							  inputObjs.val(insertData);
						 }
						 else
						 {
						 	if(inputObjs.size()>1)
						 	{
						 		inputObjs.each(function()
						 		{
						 			if($(this).attr('type')==="checkbox" || $(this).attr('type')==="radio")
						 			{
						 				if($(this).val()===insertData)
						 				{
						 					$(this).attr("checked","true");
						 				}
						 			}
						 		});
						 	}
						 }
						  container.find('[form_data="' + innerKey + '"]').attr('form_data', "");
						 // container.find('[form_data="' + b + '"]').html(innerData[i][b]);
						 // container.find('[form_data="' + b + '"]').val(innerData[i][b]);
						 // container.find('[form_data="' + b + '"]').attr('form_data', "");
					}
				}
			 } else {
			 	if($('.editor[form_data="' + key + '"]').size()==1)
			 	{
				 	$('.editor[form_data="' + key + '"]').val(form_data[key]);
				}
				if($('.display[form_data="' + key + '"]').size()==1)
				{
					$('.display[form_data="' + key + '"]').html(form_data[key]);
				}
				 //alert($('[form_data="' + key + '"]').size() + " | " + '[form_data="' + key + '"]');
				 //
			 }
		}
		
		//$('#testck').ckeditor();
		applyType();
}); 
function applyType()
{
		$('textarea[fieldtype="ckeditor"]').each(function(){
			$(this).ckeditor();
		});
		$('input[fieldtype="date"]').each(function()
		{
			$(this).datepicker();
		});
		$('select[fieldtype="select"]').each(function()
		{
			$(this).select2();
		});
}
function getLoopData()
{
	
	$('[form_data="_loop"]').each(function()
	{
		loopObj[$(this).attr("target_data")] = outHtml($(this));
	});
	
	//$( "#datepicker" ).datepicker();
}


function addNewLine(keyStr, filterType)
{
	
	$('#' + keyStr + '_container').append(loopObj[keyStr]);
	if (filterType == "edit") {
		$(".display").remove();
	} else {
		$(".editor").remove();
	}
	applyType();
}
