$(function () {
  var currentPage = 1;
  var pageSize = 5;
  function render() {
    $.ajax({
      type: "get",
      url: "/user/queryUser",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (info) {
        var html = template("tpl", info);
        $("tbody").html(html);
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: currentPage,//当前页
          totalPages: Math.ceil(info.total / pageSize),//总页数
          // size: "small",//设置控件的大小，mini, small, normal,large
          onPageClicked: function (a, b, c, page) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage = page;
            render();
          }
        });
      }
    })
  }
  render();
  //点击禁用或者启用按钮
  $("tbody").on("click", ".btn", function () {
    $(".alertModal").modal("show")
    var id = $(this).parent().data("id");
    var isDelete = $(this).hasClass("btn-danger") ? 0 : 1;

    $(".btn-sure").on("click", function () {
      $.ajax({
        type: "post",
        url: "/user/updateUser",
        data: {
          id: id,
          isDelete: isDelete
        },
        success: function (info) {
          if (info.success) {
            $(".alertModal").modal("hide");
            render();
            console.log("完成了")
          }
        }
      })
    })
  });
});


