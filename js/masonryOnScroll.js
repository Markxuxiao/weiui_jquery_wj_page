;(function ($) {
    var defaluts = {
        container: $('#masonry'),
        item : '.item',//滚动加载容器item
        loading : $('#imloading'),//加载提示dom
        max_item : 999, //最大条数
        scroll_distance :50, //距离下边多少距离加载
        callback: null
      };
    //初始加载提示 解锁
      defaluts.loading.data("on",true);
    $.fn.extend({
        "masonryOnScroll": function (options) {
            var opts = $.extend({}, defaluts, options);
            
            function scroll (){
              var opt = opts;
              if(!opt.loading.data("on")) return;
              // 计算所有瀑布流块中距离顶部最大
              var containerItem = opt.container.find(opt.item);
              var itemNum=containerItem.length;
              var itemArr=[];
              itemArr[0]=containerItem.eq(itemNum-1).offset().top+containerItem.eq(itemNum-1)[0].offsetHeight;
              itemArr[1]=containerItem.eq(itemNum-2).offset().top+containerItem.eq(itemNum-1)[0].offsetHeight;
              itemArr[2]=containerItem.eq(itemNum-3).offset().top+containerItem.eq(itemNum-1)[0].offsetHeight;
              var maxTop=Math.max.apply(null,itemArr);
              var w_height = $(window).height();
              var d_height = $(document).scrollTop();
        
              if(maxTop< w_height + d_height + opt.scroll_distance){
                opt.loading.data("on",false).fadeIn(800);
                opt.callback&&opt.callback();
                itemNum=opt.container.find(opt.item).length;
                if(itemNum >= opt.max_item){
                  opt.loading.data("on",false).fadeOut();
                }else{
                  opt.loading.data("on",true).fadeOut();
                }
              }
            }
            //事件绑定
            $(window).scroll(scroll);
        }//end masonryOnScroll
    }); 
})(window.jQuery);



