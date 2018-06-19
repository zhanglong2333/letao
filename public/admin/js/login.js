$(function () {
  $("form").bootstrapValidator({
    fields: {
      //校验用户名，对应name表单的name属性
      username: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
          callback:{
            message:"用户名不存在"
          }
        }
      },
      password: {
        validators: {
          //不能为空
          notEmpty: {
            message: '密码不能为空'
          },
          //长度校验
          stringLength: {
            min: 6,
            max: 16,
            message: '密码长度必须在6到16之间'
          },
          callback:{
            message:"密码错误 "
          }
        }
      }
    },
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    }

  }),
    $("form").on('success.form.bv', function (e) {
      e.preventDefault();
      //使用ajax提交逻辑
      $.ajax({
        type: "post",
        url: "/employee/employeeLogin",
        data: $("form").serialize(),
        dataType: "json",
        success: function (info) {
          if (info.success) {
            location.href = "index.html"
          }
          if (info.error === 1000) {
            $("form").data("bootstrapValidator").updateStatus("username" ,"INVALID", "callback")
          }
          if (info.error === 1001) {
            $("form").data("bootstrapValidator").updateStatus("password" ,"INVALID", "callback")
          }
        }
      })
    });
  $("[type=reset]").on("click", function () {
    $("form").data("bootstrapValidator").resetForm();
  })
})