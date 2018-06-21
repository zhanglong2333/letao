mui('.mui-scroll-wrapper').scroll({
  indicators: false, //是否显示滚动条
});
$(function () {
  //页面一刷新就要渲染一级分类
  $.ajax({
    type: "get",
    url: "/category/queryTopCategory",
    success: function (info) {
      $(".left-nav ul").html(template("tpl", info));
      //渲染出二级的页面
      renderSecond(info.rows[0].id);

    }
  });
  //给一级目录注册点击事件，增加一个now 的类，并发送ajax请求
  $(".left-nav ul").on("click", "li", function () {
    $(this).addClass("now").siblings().removeClass("now");
    renderSecond($(this).data("id"));
    mui('.right-nav .mui-scroll-wrapper').scroll().scrollTo(0,0,100);//100毫秒滚动到顶
  });



  // 封装一个二级的渲染的函数
  function renderSecond(id) {
    $.ajax({
      type: "get",
      url: "/category/querySecondCategory",
      data: {
        id: id
      },
      success: function (info) {
        $(".right-nav ul").html(template("tpls", info));
      }
    })
  }





})