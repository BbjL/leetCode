/* 

    实现问题
        1. 类型判断，是否为函数 设在函数原型上就没有必要判断
        2. 判断传入端上下文对象是否存在，不存在则使用window
        3. 改变函数的上下文对象并执行函数本身
        4. 返回值

*/

function person(sex, habbit) {
   console.log(this.name, this.age, sex, habbit);
 }
 const bjl = {
   name: "bjl",
   age: 12,
 };
 
 person.call(bjl, "man");
 
 Function.prototype.myApply = function (context) { 
   let result; // 返回结果
   const args = arguments[1] // 获取所有参数
   
   // 1, 传入上下文判断
   context = context || window;
   // 2. 指定上下文
   context.fn = this;
   // 3. 执行函数并返回结果
   result = context.fn(...args);
   // 4. 删除上下文的属性
   delete context.fn;
   return result;
 }
 person.myApply(bjl, ['man', 'coding']);
 
 