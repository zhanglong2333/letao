$(function () {

  render();

  //渲获取数据
  function getHistory() {
    //获取到localStorang的值
    var result = localStorage.getItem("lt_history") || "[]";
    //转换成js对象
    result = JSON.parse(result);
    return result;
  }

  // 渲染数据
  function render() {
    var result = getHistory();
    $(".lt-history").html(template("tpl", { rows: result }))
  }

  // 清空所有的数据
  $(".lt-history").on("click", ".btn-empty", function () {
    mui.confirm('您确定要全部删除吗？', '温馨提示', ['是', '否'], function (e) {
      if (e.index === 0) {
        localStorage.removeItem("lt_history");
        render();
      }

    })
  })
  //删除一条数据
  $(".lt-history").on("click", ".btn-remove", function () {
    var index = $(this).data("index");
    //确认框
    mui.confirm('您确定要删除吗？', '温馨提示', ['是', '否'], function (e) {
      if (e.index === 0) {
        var result = getHistory();
        result.splice(index, 1);
        localStorage.setItem("lt_history", JSON.stringify(result))
        render()
      }
    })




  })


  //增加功能  
  $(".btn-search").on("click", function () {
    var text = $(".lt-search [type=text]").val();
    $(".lt-search [type=text]").val("");

    var result = getHistory();
    //获取index 的下标
    var index = result.indexOf(text);
    //判断不能为空
    if (text === "") {
      mui.toast('搜索内容不能为空', { duration: 1000, type: 'div' });
      return;
    }
    //判断数组里面是否有这个下标，下标如果是存在的话，那么就把他删掉
    if (index > -1) {
      result.splice(index, 1);
    }
    if (result.length >= 10) {
      console.log("大于10了")
      result.pop();
    }
    result.unshift(text);
    localStorage.setItem("lt_history", JSON.stringify(result));
    render();
    location.href="searchList.html?key="+text;
  })
})