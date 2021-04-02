

/* 
浅拷贝实现

数组浅拷贝： Array.prototype.slice();
对象浅拷贝： Object.assign({}, target);
遍历属性实现拷贝

浅拷贝
    JSON.parse(JSON.stringify(obj1));
    缺点： 不能拷贝函数 正则对象

    循环遍历实现
*/


// 对象浅拷贝
function shallowClone (obj) {
    // typeof 引用数据类型都是object
    if (!obj || typeof obj !== 'object') return obj

    let result = Array.isArray(obj) ? [] : {};

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            result[key] = obj[key];
        }
    }
    return result;
}


function deepClone (obj) {
    if (!obj || typeof obj !== 'object') return obj;
    let result = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            result[key] = deepClone( obj[key])
        }
    }
    return result;
}


const obj1 = {
    name: '123',
    reg: /a/g,
    foo: function () {},
    array: [1, 2, ,5]
}

const obj2 = JSON.parse(JSON.stringify(obj1));
obj2.array[0] = 'bjl'
console.log(obj1, obj2);
