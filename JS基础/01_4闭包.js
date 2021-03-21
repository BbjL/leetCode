


/* 

1. 如何产生闭包?
  * 当一个嵌套的内部(子)函数引用了嵌套的外部(父)函数的变量(函数)时, 就产生了闭包
2. 闭包到底是什么?
  * 使用chrome调试查看
  * 理解一: 闭包是嵌套的内部函数(绝大部分人)
  * 理解二: 包含被引用变量(函数)的对象(极少数人)
  * 理解三: 当外部函数返回匿名函数后，其执行环境的作用域链会被销毁，但他的活动对象仍然保留在内存中，直到匿名函数被销毁(小红书p180)
  * 注意: 闭包存在于嵌套的内部函数中
3. 产生闭包的条件?
  * 函数嵌套
  * 内部函数引用了外部函数的数据(变量/函数)

常见的闭包
1. 将函数作为另一个函数的返回值
2. 将函数作为实参传递给另一个函数调用

生命周期
1. 产生: 在嵌套内部函数定义完时就产生了(不是在调用)
2. 死亡: 在嵌套的内部函数成为垃圾对象时

1. 缺点
  * 函数执行完后, 函数内的局部变量没有释放, 占用内存时间会变长
  * 容易造成内存泄露
2. 解决
  * 能不用闭包就不用
  * 及时释放
*/

 // 1. 将函数作为另一个函数的返回值
 function fn1() {
    var a = 2
    function fn2() {
      a++
      console.log(a)
    }
    return fn2
  }
  var f = fn1()
  f() // 3
  f() // 4

  // 2. 将函数作为实参传递给另一个函数调用
  function showDelay(msg, time) {
    setTimeout(function () {
      alert(msg)
    }, time)
  }
  showDelay('atguigu', 2000)

// 面试题
//代码片段一
var name = "The Window";
var object = {
  name : "My Object",
  getNameFunc : function(){
    return function(){
      return this.name;
    };
  }
};
alert(object.getNameFunc()());  //?  the window
//object.getNameFunc()返回的是一个函数  如果在调用this指向的自然是window

//代码片段二
var name2 = "The Window";
var object2 = {
  name2 : "My Object",
  getNameFunc : function(){
    var that = this;
    return function(){
      return that.name2;
    };
  }
};
alert(object2.getNameFunc()()); //?  my object