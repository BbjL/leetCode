
function SubType (name) {
    this.name = name;
    return 1
}
const sub = new SubType('tom');
console.log(sub);

/* 

    实现操作
        1. 创建一个指向函数原型的对象
        2. 将这个创建指定原型的对象作为绑定到函数本身并执行
        3. 判断返回值，如果函数返回的是值类型，则返回创建的对象；
            如果返回的是引用数据类型，则返回该引用数据对象

*/

/** 
 * @param {Array} arguments
 * @return {Object | function}
 * */ 
function myNew () {
    let constructor, newObj;
    constructor = Array.prototype.shift.call(arguments);

    // 1、 创建一个指定原型的对象
    newObj  = Object.create(constructor.prototype);

    // 2. 修改this指向，执行函数,
    let result = constructor.apply(newObj, Array.prototype.slice.call(arguments));

    // 3. 判断返回值
    let flag = result && (typeof result === 'function' || typeof result === 'object');
    return flag ? result : newObj;
}
const sub2 = myNew(SubType, 'tom');
console.log(sub2);