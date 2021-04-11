


##### 事件循环机制
1. JS引擎首先必须执行所有初始化的同步任务代码
2. 当触发事件时，事件管理模块会将对应的其放入回调队列中
3. 通过事件循环机制将队列中的任务放入执行栈中执行
    > 其中，回调队列中存在两种队列，宏任务队列、微任务队列
     每次取出第一个宏任务执行前，都要将所有微任务一个一个取出来执行

##### 宏队列 微队列
**宏任务**：
    1. DOM事件管理模块
    2. ajax回调管理模块
    3. 定时器管理模块

**微任务**：
    1. Promise管理模块
    2. Async/Await(实际就是promise)
    3. MutationObserver(html5新特性)

##### 浏览器事件循环机制:
    当初始化代码执行栈执行完后,会执行微队列中的所有任务,之后在调用宏任务队列中的任务
    执行完这个任务后,将再次清空微任务队列中的任务,如果微任务在添加微任务，也会将刚添加的微任务清空,之后在执行宏任务队列中的下一个任务
    ......

##### node事件循环机制: 
    nodejs端则会将同源的任务放在一起执行，如果涉及到同源宏任务的嵌套，
    仍会将同源任务放在一起，但是内部的任务会放在下一次事件循环时执行。
    但与浏览器相同执行完一个宏任务之后就会清空微任务，
    即使微任务内嵌套微任务，也会将嵌套的微任务执行完毕后

##### await异步函数的差异
1. 如果await 后面直接跟的为一个变量/非异步函数，比如：await 1；这种情况的话相当于直接把await后面的代码注册为一个微任务，可以简单理解为promise.then(await下面的代码)。然后跳出async1函数，执行其他代码，当遇到promise函数的时候，会注册promise.then()函数到微任务队列，注意此时微任务队列里面已经存在await后面的微任务。所以这种情况会先执行await后面的代码（async1 end），再执行async1函数后面注册的微任务代码(promise1,promise2)。
--------------------------- 
2. 如果await后面跟的是一个异步函数的调用，此时执行完await并不先把await后面的代码注册到微任务队列中去，而是执行完await之后，直接跳出async1函数，执行其他代码。然后遇到promise的时候，把promise.then注册为微任务。其他代码执行完毕后，需要回到async1函数去执行剩下的代码，然后把await后面的代码注册到微任务队列当中，注意此时微任务队列中是有之前注册的微任务的。所以这种情况会先执行async1函数之外的微任务(promise1,promise2)，然后才执行async1内注册的微任务(async1 end). 可以理解为，这种情况下，await 后面的代码会在本轮循环的最后被执行. 

``` javascript
console.log('script start')
 
async function async1() {
await async2()
console.log('async1 end')
}
async function async2() {
console.log('async2 end')
}
async1()
 
setTimeout(function() {
console.log('setTimeout')
}, 0)
 
new Promise(resolve => {
console.log('Promise')
resolve()
})
.then(function() {
console.log('promise1')
})
.then(function() {
console.log('promise2')
})
 
console.log('script end')
```
output 
>  script start => async2 end => Promise => script end => async1 end => promise1 => promise2 => setTimeout

``` javascript
console.log('script start')
 
async function async1() {
    await async2()
    console.log('async1 end')
}
async function async2() {
    console.log('async2 end')
    return Promise.resolve().then(()=>{
        console.log('async2 end1')
    })
}
async1()
 
setTimeout(function() {
    console.log('setTimeout')
}, 0)
 
new Promise(resolve => {
    console.log('Promise')
    resolve()
})
.then(function() {
    console.log('promise1')
})
.then(function() {
    console.log('promise2')
})
 
console.log('script end')
```
output： 
> script start => async2 end => Promise => script end => async2 end1 => promise1 => promise2 => async1 end => setTimeout


##### 参考连接：
[浏览器中的事件循环](https://blog.csdn.net/LuckyWinty/article/details/104765786/)