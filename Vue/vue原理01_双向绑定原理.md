##### 数据代理
将data中的数据代理到vue实例对象上,这样就可以通过直接调用this来获取或者修改属性值

- 为什么data是一个函数？


使用方法：
```javascript
function MVVM(options) {
  // 将选项对象保存到vm
  this.$options = options;
  // 将data对象保存到vm和datq变量中
  var data = this._data = this.$options.data;
  //将vm保存在me变量中
  var me = this;
  // 遍历data中所有属性
  Object.keys(data).forEach(function (key) { // 属性名: name
    // 对指定属性实现代理
    me._proxy(key);
  });
}

MVVM.prototype = {
  // 对指定属性实现代理
  _proxy: function (key) {
    // 保存vm
    var me = this;
    // 给vm添加指定属性名的属性(使用属性描述)
    Object.defineProperty(me, key, {
      configurable: false, // 不能再重新定义
      enumerable: true, // 可以枚举
      // 当通过vm.name读取属性值时自动调用
      get: function proxyGetter() {
        // 读取data中对应属性值返回(实现代理读操作)
        return me._data[key];
      },
      // 当通过vm.name = 'xxx'时自动调用
      set: function proxySetter(newVal) {
        // 将最新的值保存到data中对应的属性上(实现代理写操作)
        me._data[key] = newVal;
      }
    });
  }
};
```


##### 数据劫持
遍历data中的所有属性，为当中的每个引用对象的属性创建Dep实例对象

```javascript
defineReactive: function(data, key, val) {
    // 创建与当前属性对应的dep对象
    var dep = new Dep();
    // 间接递归调用实现对data中所有层次属性的劫持
    var childObj = observe(val);
    // 给data重新定义属性(添加set/get)
    Object.defineProperty(data, key, {
        enumerable: true, // 可枚举
        configurable: false, // 不能再define
        get: function() {
            // 建立dep与watcher的关系
            if (Dep.target) {
                dep.depend();
            }
            // 返回属性值
            return val;
        },
        set: function(newVal) {
            if (newVal === val) {
                return;
            }
            val = newVal;
            // 新的值是object的话，进行监听
            childObj = observe(newVal);
            // 通过dep
            dep.notify();
        }
    });
}
```


##### 模板编译
1. 递归将全部dom节点拉去下拉到储存到fragment对象中
2. 对fragment的每个DOM进行模板编译，对当中的指令、属性、事件进行解析
3. 为每个用到的data中的属性，创建一个Watcher实例对象
4. 在获取值时，通过双向绑定的get方法，通过观察者模式将watcher实例绑定到对应的dep实例上 subs = [watcher1, watcher2，watcher3];
5. 当数据发生变化时，对应属性的set方法将会被调佣，同时notify所有观察的watcher实例


###### dep对象
```javascript
var uid = 0;

function Dep() {
    // 标识属性
    this.id = uid++;
    // 相关的所有watcher的数组
    this.subs = [];
}

Dep.prototype = {
    addSub: function(sub) {
        this.subs.push(sub);
    },

    depend: function() {
        Dep.target.addDep(this);
    },

    removeSub: function(sub) {
        var index = this.subs.indexOf(sub);
        if (index != -1) {
            this.subs.splice(index, 1);
        }
    },

    notify: function() {
        // 通知所有相关的watcher(一个订阅者)    
        this.subs.forEach(function(sub) {
            sub.update();
        });
    }
};

Dep.target = null;
```

###### watcher
```javascript
function Watcher(vm, exp, cb) {
  this.cb = cb;  // callback
  this.vm = vm;
  this.exp = exp;
  this.depIds = {};  // {0: d0, 1: d1, 2: d2}
  this.value = this.get();
}

Watcher.prototype = {
  update: function () {
    this.run();
  },
  run: function () {
    // 得到最新的值
    var value = this.get();
    // 得到旧值
    var oldVal = this.value;
    // 如果不相同
    if (value !== oldVal) {
      this.value = value;
      // 调用回调函数更新对应的界面
      this.cb.call(this.vm, value, oldVal);
    }
  },
  addDep: function (dep) {
    if (!this.depIds.hasOwnProperty(dep.id)) {
      // 建立dep到watcher
      dep.addSub(this);
      // 建立watcher到dep的关系
      this.depIds[dep.id] = dep;
    }
  },
  get: function () {
    Dep.target = this;
    // 获取当前表达式的值, 内部会导致属性的get()调用
    var value = this.getVMVal();

    Dep.target = null;
    return value;
  },

  getVMVal: function () {
    var exp = this.exp.split('.');
    var val = this.vm._data;
    exp.forEach(function (k) {
      val = val[k];
    });
    return val;
  }
};
```