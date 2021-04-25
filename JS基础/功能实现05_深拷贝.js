/* 
浅拷贝实现

数组浅拷贝： Array.prototype.slice();
对象浅拷贝： Object。assign({}, target);
遍历属性实现拷贝

浅拷贝
    JSON.parse(JSON.stringify(obj1));
    缺点： 不能拷贝函数 正则对象

    循环遍历实现
*/

function deepClone(obj) {
  if (!obj || typeof obj !== "object") return obj;
  let result = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = deepClone(obj[key]);
    }
  }
  return result;
}

function isObject(obj) {
  return typeof obj === "object" && obj !== null;
}

// 使用Map函数  解决循环引用问题
function deepCopy(obj, map = new Map()) {
  if (!isObject(obj)) return;
  var newObj = Array.isArray(obj) ? [] : {};
  if (map.get(obj)) {
    return map.get(obj);
  }
  map.set(obj, newObj);
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (isObject(obj[key])) {
        newObj[key] = deepCopy(obj[key], map);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  return newObj;
}

const obj1 = {
  name: "123",
  reg: /a/g,
  foo: function () {},
  array: [1, 2, , 5],
};

const obj2 = JSON.parse(JSON.stringify(obj1));
obj2.array[0] = "bjl";
console.log(obj1, obj2);
