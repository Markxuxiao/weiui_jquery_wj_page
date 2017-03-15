$(function() {FastClick.attach(document.body);});
$(function(){
	var loading = false;
	$(document.body).infinite().on("infinite", function() {
		if(loading) return;
		loading = true;//上锁
		$.post(ajax_list.api,ajax_list.data,function(data){
			if(!data.msg){
				loading = true;//上锁
				$('#imloading').hide();
				$('#noMore').show();
				$(document.body).destroyInfinite();//销毁滚动加载
				return;
			}
			var html = template('template_item',data);
			$('#masonry').append(html);
			ajax_list.page_index++;//页数加1
			loading = false;//解锁
		});
	});
});