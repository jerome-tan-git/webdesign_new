$( document ).ready( function() {
	$('.exam_option').click(function()
	{
		if($(this).hasClass('panel-danger'))
		{
			$(this).removeClass('panel-danger');
		}
		$('.exam_option').removeClass('panel-primary');
		$(this).addClass('panel-primary');
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
} );

