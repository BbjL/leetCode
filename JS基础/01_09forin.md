##### for...in语句
1. 以任意顺序遍历一个对象的除Symbol以外的可枚举属性。
2. 能够遍历原型上的可枚举属性



#####  hasOwnProperty(key) 和 getOwnPropertyNames(key)判断是否是该对象本身的属性

1. hasOwnProperty() 
  - 方法会返回一个布尔值，指示对象自身属性中是否具有指定的属性（也就是，是否有指定的键）。
  - 返回值 用来判断某个对象是否含有指定的属性的布尔值 Boolean。
  - 该方法会忽略掉那些从原型链上继承到的属性。
```javascript
for (let key in obj) {
  if (obj.hasOwnProperty(key)) {
    console.log(key);
  }
}

for (const key in obj) {
  if (Object.hasOwnProperty.call(obj, key)) {
    console.log(key);
  }
}
```


2. Object.getOwnPropertyNames()
- 方法返回一个由指定对象的所有自身属性的属性名（**包括不可枚举属性**但不**包括Symbol值**作为名称的属性）组成的数组。
- 返回值： 在给定对象上找到的**自身属性**对应的字符串数组。
- 数组中枚举属性的顺序与通过 for...in 循环（或 Object.keys）迭代该对象属性时一致。数组中不可枚举属性的顺序未定义。
- 不会获取原型链上的属性