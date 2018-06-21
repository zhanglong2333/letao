$(function () {
  var pages = 1;
  var pageSize = 5;
  render();
  //把ajax封装起来
  function render() {
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: pages,
        pageSize: pageSize
      },
      success: function (info) {
        $("tbody").html(template("tpl", info));
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: pages,//当前页
          totalPages: Math.ceil(info.total / info.size),//总页数
          size: "small",//设置控件的大小，mini, small, normal,large
          onPageClicked: function (a, b, c, p) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            pages = p;
            render();
          }
        });
      }
    })
  }

  //给表单注册表单校验成功事件
  $("form").on("success.form.bv", function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/category/addTopCategory",
      data: $("form").serialize(),
      success: function (info) {
        if (info.success) {
          pages = 1;
          render();
          $(".addModal").modal("hide")
          $("form").data('bootstrapValidator').resetForm(true);
        }
      }
    })
  })


})



$(".add-btn").on("click", function () {
  $(".addModal").modal("show")
});
//校验表单
$("form").bootstrapValidator({
  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },
  fields: {
    //校验用户名，对应name表单的name属性
    categoryName: {
      validators: {
        //不能为空
        notEmpty: {
          message: '一级分类名称不能为空'
        }
      }
    }

  }
})