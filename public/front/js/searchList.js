$(function () {
  //区域滚动
  mui('.mui-scroll-wrapper').scroll({
    indicators: false, //是否显示滚动条
  });
  //设置当前页数以及显示数量
  var page = 1;
  var pageSize = 10;

  //获取地址栏中的参数
  var key = getSearch().key;
  //设置给input框
  $(".lt_search input").val(key);
  //渲染
  render();


  //点击搜索按钮，渲染
  //1. 给按钮注册点击事件
  //2. 获取到文本框的值
  //3. 重新渲染
  $(".lt-search button").on("click", function () {

    //当点击搜索按钮的时候，需要把排序的样式重置
    //把所有的li的now的类全部清掉
    //把所有的li下的span的箭头全部向下
    $(".lt-lost li").removeClass("now")
    $(".lt-lost span").removeClass("fa-angle-up").addClass("fa-angle-down");


    key = $(".lt-search input").val();
    render();
  });

  //如果当前的li没有now这个类，让当前的li有now这个类，并且让其他的li没有now这个类,让所有的span的箭头都初始向下
  //如果当前li有now这个类，修改当前li下的span的箭头的类
  $(".lt-lost li[data-type]").on("click", function () {

    var $this = $(this);

    if (!$this.hasClass("now")) {
      //没有now这个类
      //1. 让当前的li有now这个类，移除其他li的now
      $(this).addClass("now").siblings().removeClass("now");
      //2. 让所有span下的箭头都向下
      $(".lt-lost li span").addClass("fa-angle-down").removeClass("fa-angle-up");
    } else {
      $(this).find("span").toggleClass("fa-angle-down").toggleClass("fa-angle-up");
    }

    render();

  });





  //封装ajax
  function render() {
    var obj = {
      proName: key,
      page: page,
      pageSize: pageSize
    };
    //判断是否需要添加price或者是num参数
    var $select = $(".lt-lost li.now");
    if ($select.length > 0) {
      console.log("需要排序");
      var type = $select.data("type");
      var value = $select.find("span").hasClass("fa-angle-down") ? 2 : 1;
      //给参数增加了一个属性，属性可以能是price，也可以能是num
      obj[type] = value;
    } else {
      console.log("不需要排序");
    }
    $.ajax({
      type: 'get',
      url: '/product/queryProduct',
      data: obj,
      success: function (info) {
        //console.log(info);
        setTimeout(function () {
          //结合模板引擎渲染出来
          $(".lt-shop").html(template("tpl", info));
        }, 1000);

      }
    })
  }



  function getSearch() {
    //获取到地址的key
    var search = location.search;
    //对地址进行转码
    search = decodeURI(search);
    //去除?
    search = search.slice(1);
    var obj = {};
    //把字符串变成一个数组
    var arr = search.split("&");
    arr.forEach(function (e, i) {
      var k = e.split("=")[0];
      var v = e.split("=")[1];
      obj[k] = v
    });
    return obj;
  }





})

