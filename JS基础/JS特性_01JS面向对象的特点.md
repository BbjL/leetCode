##### Javascript面向对象的三大特点

1. 封装
对属性和方法的封装
- 类：封装对象的属性和行为
- 方法：封装具体逻辑功能
- 访问封装：访问修饰封装无非就是对其访问权限进行封装

2. 继承
Javascript的继承通过原型属性进行父类的继承

3. 多态
  - 覆盖
    覆盖父类的方法
  - 重载
    JS并没有对重写对应的API，需要自己实现

  ```javascript
  class Employees {
      constructor(arg){
          let obj = null;
          switch(typeof arg)
          {
              case "string":
                    obj = new StringEmployees(arg);
                    break;
              case "object":
                    obj = new ObjEmployees(ObjEmployees);
                    break;
              case "number":
                  obj = new NumberEmployees(ObjEmployees);
                  break;
          }
          return obj;
      }
  }
  class ObjEmployees {
      constructor(arg){
          console.log("ObjEmployees")
      }
  }
  class StringEmployees {
      constructor(arg){
          console.log("StringEmployees")
      }
  }
  class NumberEmployees {
      constructor(arg){
          console.log("NumberEmployees")
      }
  }
  new Employees({})   // ObjEmployees
  new Employees("123456") //  StringEmployees
  new Employees(987654)   //  NumberEmployees
  ```