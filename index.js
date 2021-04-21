let obj1 = {};
let obj2 = {
  b: obj1,
};
obj1.a = obj2;
console.log(obj1);

//存放已拷贝的对象用于循环引用检测
let objArr = [];

function deepCopy(obj) {
  //判断循环引用检测
  for (let ele of objArr) {
    if (obj === ele.source) {
      return ele.target;
    }
  }
  //拷贝容器
  let newObj = {};

  //将拷贝的对象放入数组中用于循环引用检测
  objArr.push({
    source: obj, //被拷贝对象上的原引用对象，用于循环检测比对
    target: newObj,
  });

  //使用Reflect可以检测到Symbol类型的属性
  Reflect.ownKeys(obj).forEach((key) => {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === "object") {
        //使用Array.from对拷贝的数组进行处理
        newObj[key] =
          Object.prototype.toString.call(obj[key]) === "[object Array]"
            ? Array.from(deepCopy(obj[key], key))
            : deepCopy(obj[key], key);
      } else {
        //属性值为原始类型的值
        newObj[key] = obj[key];
      }
    }
  });
  return newObj;
}



console.log(deepCopy(obj1));
