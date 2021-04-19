##### 父子组件通信

1. props
2. provide/inject

```javascript
  // 父组件
  provide: {
    msg: '1234124'
  }

  inject: ['msg'] | {
  xingming: {
    from: 'name',
    default: ''
  },
  msg: {
    from: 'msg',
    default: ''
  }
},
```

3. vuex
4. 借助其他发布订阅库