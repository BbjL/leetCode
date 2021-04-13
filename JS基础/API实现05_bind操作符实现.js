/* 

    实现问题
        1. 类型判断，是否为函数 设在函数原型上就没有必要判断
        2. 判断传入端上下文对象是否存在，不存在则使用window
        3. 改变函数的上下文对象并执行函数本身
        4. 判断返回值是否是构造函数还是普通函数，最终解决执行时端返回值

*/

function person(sex, habbit) {
   console.log(this.name, this.age, sex, habbit);
 }
 const bjl = {
   name: "bjl",
   age: 12,
 };
 
 person.call(bjl, "man");
 
 Function.prototype.myBind = function (context) { 
   const args = [...arguments].slice(1) // 获取所有参数
   context = context || window; // 获取上下文
   const fn = this;        // 获取函数

   // 3.返回函数
   return function Fn () {
      return fn.apply(
            this instanceof Fn ? this : context, 
            args.concat(...arguments)
         )
   };
 }
 person.myBind(bjl, 'man')('coding');
 
 /* 
 
 call、apply、bind的区别 ？ 
 
 共同点：三者都可以改变其所在执行上下文this的指向，
 不同点：
 1。前两者会返回函数执行的结果，bind则会返回改变执行上下文指this后的函数
 2. call apply 基本一致，不同的地方是传入参数的方式不一样，call的参数需要一个一个传进去，apply则是以数组的形式传进去
 3. bind返回是一个函数，该函数执行时将会自动绑定给定的this，因此在实现bid的时候需要考虑作为构造函数使用的情况，不能直接返回执行结果
   

 用call、apply、bind能改变箭头函数的this指向吗 ？
 不能，箭头函数主要解决匿名函数this指向改变的问题，包括setTimeout和setInterval中使用this所造成的问题。
 箭头函数的this指向的时定义时所在作用域对应的执行环境的this,并不是自己的this，因此不能改变箭头函数this的指向，
 如果放在最外层，在非严格模式下，this指向的时window，在严格模式下指向的时undefined

 */
