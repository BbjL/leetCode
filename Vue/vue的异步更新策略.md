







##### 简述
可能你还没有注意到，Vue 在更新 DOM 时是异步执行的。只要侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的。然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。Vue 在内部对异步队列尝试使用原生的 Promise.then、MutationObserver 和 setImmediate，如果执行环境不支持，则会采用 setTimeout(fn, 0) 代替。

##### 例子
```js
export default {
    data () {
        return {
            test: 0
        };
    },
    mounted () {
      for(let i = 0; i < 1000; i++) {
        this.test++;
      }
    }
}
```
根据mounted里的代码，test一共被触发了1000次，如果不是异步更新，watcher在被触发1000次时，每次都会去更新视图，这是非常非常消耗性能的。因此，vue才会采用异步更新的操作，如果同一个 watcher 被多次触发，只会被推入到队列中一次。然后在下一次事件循环'tick‘的时候，只需更新一次dom即可。

[Vue的异步更新策略](https://segmentfault.com/a/1190000021513874)