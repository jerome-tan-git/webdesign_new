	$(document).ready(function() {
		$('.mom_content').hover(function(){
			$(this).find('.mom_icon_img').attr('src','./images/mom_icon.png');
			//mom_icon.png
		},function(){
			$(this).find('.mom_icon_img').attr('src','./images/mom_icon_gray.png');
		});
	});
	


	$(document).ready(function() {
		$('.notice_content').hover(function(){
			$(this).find('.mom_icon_img').attr('src','./images/notice_red.png');
			//mom_icon.png
		},function(){
			$(this).find('.mom_icon_img').attr('src','./images/notice_gray.png');
		});
	});