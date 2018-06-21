var pages = 1;
  var pageSize = 5;
render()

$(".add-btn").on("click", function () {
  $(".addModal").modal("show");
  $.ajax({
    type: "get",
    url: "/category/queryTopCategoryPaging",
    data: {
      page: 1,
      pageSize: 100
    },
    success: function (info) {
      console.log(info)
      $(".dropdown-menu ").html(template("tpls", info))
    }
  })
})
$(".dropdown-menu").on("click", "a", function () {
  $(".choice-btn span:nth-child(1 )").text($(this).text())
  $("[name=categoryId]").val($(this).data("id"));
  $("form").data("bootstrapValidator").updateStatus("categoryId", "VALID");

})

//upload初始化
$("#fileupload").fileupload({
  dataType: "json",
  done: function (e, data) {
    $(".img-box img").attr("src", data.result.picAddr);
    $("[name=brandLogo]").val(data.result.picAddr);
    $("form").data("bootstrapValidator").updateStatus("brandLogo", "VALID");
  }
});
//表单校验功能
$("form").bootstrapValidator({
  excluded: [],
  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },
  fields: {
    categoryId: {
      validators: {
        notEmpty: {
          message: "请选择一级分类"
        }
      }
    },
    brandName: {
      validators: {
        notEmpty: {
          message: "请输入二级分类的名称"
        }
      }
    },
    brandLogo: {
      validators: {
        notEmpty: {
          message: "请选择二级分类的图片"
        }
      }
    }
  }

  //3.
})
//注册表单校验成功的事件
$("form").on('success.form.bv', function (e) {
  e.preventDefault();
  //使用ajax提交逻辑
  $.ajax({
    type: "post",
    url: "/category/addSecondCategory",
    data: $("form").serialize(),
    success: function (info) {
      if (info.success) {
        $(".addModal").modal("hide");
        pages = 1;
        render();
        $("form").data("bootstrapValidator").resetForm(true );
        $(".choice-btn span:nth-child(1)").text("请选择一级分类");
        $(".img-box img").attr("src","images/none.png")

      }
    }
  })
});





//封装一个ajax 动态渲染页面
function render() {
  
  $.ajax({
    type: "get",
    url: "/category/querySecondCategoryPaging",
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