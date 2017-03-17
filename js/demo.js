$(function () {
  'use strict';
  $(document).on("click", ".js-right-panel", function() {
          $.openPanel("#panel-right-panel");
  });

  $("#today").calendar({
      value: ['2015-12-05']
  });

  //无限滚动
  $(document).on("pageInit", "#page-infinite-scroll-bottom", function(e, id, page) {
    var ajax_list = {};
        ajax_list.page_index =0;
        ajax_list.api = 'page2.aspx';

    var loading = false;
    function addItems() {
      //$.post(ajax_list.api,{page:ajax_list.page_index},function(data){
        var data = {list:[{},{},{},{},{}],msg:1};
        $('#imloading').show();
        if(!data.msg){
          loading = true;//上锁
          $('#imloading').hide();
          $('#noMore').show();
          $.detachInfiniteScroll($('.infinite-scroll'));//销毁滚动加载
          return;
        }
        var html = template('template_item',data);
        $('#masonry').append(html)
        $('#imloading').hide();
        ajax_list.page_index++;//页数加1
        loading = false;//解锁
        $.refreshScroller();
      //});
    }

    $(page).on('infinite', function() {
      if(loading) return;
      loading = true;//上锁
      addItems();
    });
  });





  $.init();
});

