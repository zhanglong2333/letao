$(document).ajaxStart(function () {
  NProgress.start();
});
$(document).ajaxStop(function () {
  //完成进度条
  setTimeout(function () {
    NProgress.done();
  }, 500);
});
//设置一个全局判断，每次到一个页面只要不是登录页面，就发送ajax请求，只要退出了，就跳转到登录界面
if (location.href.indexOf("login.html") == -1) {
  $.ajax({
    type: "get",
    url: "/employee/checkRootLogin",
    success: function (data) {
      if (data.error === 400) {
        //跳转到登录页面
        location.href = "login.html";

      }
    }
  })
}
$(function () {
  $(".child").on("click", function () {
    $(this).next().slideToggle();

  })
})

$(function () {
  $(".lt-icon").on("click", function () {
    $(".lt_aside").toggleClass("lf_pl");
    $(".main").toggleClass("rt_pl");
  })

});

//设置退出事件
//1.弹出模态框

$(function () {
  $(".rt-icon").on("click", function () {
    $(".leaveModal").modal("show");
  });
});
$(function () {
  $(".btn-confirm").on("click", function () {
    $.ajax({
      type: "get",
      url: "/employee/employeeLogout",
      success: function (info) {
        if (info.success) {
          //跳转到登录页面
          location.href = "login.html";

        }
      }
    })
  })
})
