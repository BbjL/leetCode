###### v-model实现
v-model实际上是v-on v-bind的语法糖
1. 绑定数据value
2. 触发输入事件input

等同于
```javascript
<input type="text" v-bind:value="username" v-on:input="username=$event.target.value">
```

```javascript
<parentComponent v-bind:value="data" v-on:input="data => value = data">
等于=======>
<parentComponent v-model="data">

<childComponent> =====> this.$emit("input", value)
```