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
 
 