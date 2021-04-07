/* 

柯里化的概念
    数学与计算机科学的概念：将接受多个参数的函数转化成一系列使用一个参数的函数
    再接受完所有参数后，返回执行结果
    ja的柯里化：
        - 在数学和计算机科学中的柯里化函数，一次只能传递一个参数
        - 而我们Javascript实际应用中的柯里化函数，可以传递一个或多个参数。


    参考链接：
    [代码实现](https://segmentfault.com/a/1190000012364000)
    [概念](https://juejin.cn/post/6844903882208837645)

*/

function add (x, y, z, k) {
    return x + y + z + k;
}


// es5 实现
function curry (fn) {
    function _c (argsCount, args) {
        return argsCount <= 0 ?
            fn.apply(null, args) : 
            function () {
                const argsList = Array.prototype.slice.call(arguments);
                return _c (argsCount - argsList.length, args.concat(argsList)) 
            }
    }
    return _c(fn.length, []);
}

// es6实现
var curry = fn => {
    const _c = (count, argsList) => {
        return count <= 0 ? 
            fn(...argsList) : 
            (...args) => {
                return _c(count - args.length, argsList.concat(args));
            }
    }
    return _c(fn.length, [])
}



const fn = curry(add);
const a = fn(1)(2)(3)(4)
const b = fn(1, 2, 6)(3)
console.log(a, b);