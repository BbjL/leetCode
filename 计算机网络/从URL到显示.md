##### 从输入url到浏览器显示需要经历什么

1. 浏览器解析网址，如果浏览器存在缓存，则使用缓存，如果没则获取目标的ip地址
    + 浏览器缓存
    + 本机缓存
    + hosts文件
    + 路由器缓存
    + ISP DNS缓存
    + DNS递归查询
2. 与目标IP建立TCP连接，三次握手
3. 发送HTTP请求
4. 服务器收到HTTP请求后进行处理，解析HTTP头部是否包含缓存验证信息，如果缓存新鲜则返回304等相应端状态码
5. 服务器处理完毕，通过TCP连接发送HTTP相应报文
6. 浏览器查看是否进行缓存
7. 浏览器对返回响应进行解码（gzip 压缩等）
8. 解析文档并渲染到页面

##### 从输入 url 到浏览器显示浏览器端工作原理

![浏览器各个进程](https://pic2.zhimg.com/v2-f04b3c3b86e76c1f63679d6a93191251_r.jpg)
1. 浏览器进程的 UI 线程，捕捉地址栏内的地址，判断是 query 还是 url
2. 网络进程会执行 DNS 查询，随后为请求建立 TLS 连接，如果 network 进程 接收到了重定向请求头如 301，network 进程 会通知 UI 进程 服务器要求重定向，之后，另外一个 URL 请求会被触发。
3. 当请求响应返回的时候，network 进程 会依据 Content-Type 及 MIME Type sniffing 判断响应内容的格式。
   如果响应内容的格式是 HTML ，下一步将会把这些数据传递给 renderer process，如果是 zip 文件或者其它文件，会把相关数据传输给下载管理器。
   Safe Browsing 检查也会在此时触发，如果域名或者请求内容匹配到已知的恶意站点，network thread 会展示一个警告页。此外 CORB 检测也会触发确保敏感数据不会被传递给渲染进程。
4. Browser Process 会给 renderer process 发送 IPC 消息来确认导航，一旦 Browser Process 收到 renderer process 的渲染确认消息，导航过程结束，页面加载过程开始。

##### 文档解析过程

![渲染详细过程](https://segmentfault.com/img/remote/1460000018811212?w=705&h=227)
![渲染过程](https://img2020.cnblogs.com/blog/1944968/202007/1944968-20200701000944192-1745408562.png)

1. 构建 DOM 树和 CSSOM 树
2. 生成 DOM 树和 CSSOM 树后进行样式计算形成 Render tree
3. 主线程遍历 Render tree 形成 layout tree 记录每个节点的大小和位置信息，同时创建一张绘制记录表（paint record），记录每个节点端绘制顺序，记录各个元素端绘制顺序
4. 主线程遍历 layout tree 生成图层数 layer tree
5. 主线程通知并传递 layer tree 和 绘制顺序表给合成器线程（compositor 线程），合成器线程栅格化每一层。有的层的可以达到整个页面的大小，因此，合成器线程将它们分成多个磁贴（块），并将每个磁贴发送到栅格线程，栅格线程会栅格化每个块并存储在 GPU 显存中。一旦磁贴被栅格化完成，合成器线程会收集称为绘制四边形的磁贴信息以创建合成帧。
6. 合成帧随后会通过 IPC 消息传递给浏览器进程，由于浏览器的 UI 改变或者其它拓展的渲染进程也可以添加合成帧，这些合成帧会被传递给 GPU 用以展示在屏幕上，如果滚动发生，合成器线程会创建另一个合成帧发送给 GPU。

- **特点**
  合成器的优点在于，其工作无关主线程，合成器线程不需要等待样式计算或者 JS 执行，这就是为什么合成器相关的动画 最流畅，如果某个动画涉及到布局或者绘制的调整，就会涉及到主线程的重新计算，自然会慢很多。

##### 重排 reflow 和重绘 repaint

**重排**
当改变一个元素的尺寸位置时，会重新进行样式计算、布局、绘制以及后面的所有流程，这个过程称为回流/重排。

- 常见引起回流属性和方法
  任何会改变元素几何信息(元素的位置和尺寸大小)的操作，都会触发回流， + 添加或者删除可见的 DOM 元素； + 元素尺寸改变——边距、填充、边框、宽度和高度 + 内容变化，比如用户在 input 框中输入文字 + 浏览器窗口尺寸改变——resize 事件发生时 + 计算 offsetWidth 和 offsetHeight 属性 + 设置 style 属性的值

**重绘**
当改变一个元素的颜色属性，不会触发布局，但还是会进行样式计算和绘制，这个过程称为重绘。

- 常见引起回流的方法和属性
  ![](https://segmentfault.com/img/remote/1460000018811225?w=554&h=235/view)

当改变一个元素的颜色属性，不会触发布局，但还是会进行样式计算和绘制，这个过程称为重绘。

**为什么要避免回流**
重绘和重排会占用主线程的大量资源，大量的重绘和重排将会阻塞 JS 代码的执行。如果在页面中运用一个会导致大量重绘（触发样式计算和绘制）重排（样式计算后的所有过程），将会阻塞 JS 代码的运行，同时由于 JS 引擎不能及时归还主线程，将会导致动画出现卡顿。

**如何减少回流**
- 使用 transform 替代
- 使用 visibility 替换 display: none ，因为前者只会引起重绘，后者会引发回流（改变了布局）
- 不要把节点的属性值放在一个循环里当成循环里的变量。
- 不要使用 table 布局，可能很小的一个小改动会造成整个 table 的重新布局
- 动画实现的速度的选择，动画速度越快，回流次数越多，也可以选择使用 requestAnimationFrame
- 将频繁重绘或者回流的节点设置为图层 will-change，图层能够阻止该节点的渲染行为影响别的节点。比如对于 video 标签来说，浏览器会自动将该节点变为图层。

**使用 requestAnimationFrame 如何减少回流**
这个方法会在每一帧被调用 ，通过 API 的回调，我们可以把 JS 运行任务分成多个更小的任务块（分到每一帧），在每一帧时间用完前暂停 JS 执行，归还主线程
例子： 插入多个节点不卡顿

```javascript
const element = document.getElementById("some-element-you-want-to-animate");
let start;

function step(timestamp) {
  if (start === undefined) start = timestamp;
  const elapsed = timestamp - start;

  //这里使用`Math.min()`确保元素刚好停在200px的位置。
  element.style.transform = "translateX(" + Math.min(0.1 * elapsed, 200) + "px)";

  if (elapsed < 2000) {
    // 在两秒后停止动画
    window.requestAnimationFrame(step);
  }
}

window.requestAnimationFrame(step);
```

参考连接：
[图解浏览器的基本工作原理](https://zhuanlan.zhihu.com/p/47407398?from_voters_page=true)

##### 从 url 到显示的优化全程
- 在传输阶段
  1. DNS 缓存，浏览器 本机缓存 host 文件 ISP 服务器 等提供 DNS 缓存域名对应的 IP 地址，不必再去寻找对应的 IP 地址
  2. TCP 连接复用（TCP Connection Reuse），在 HTTP 请求头中的 Connection 上加 keep-alive；HTTP/2.0 多路复用等。
  3. HTTP2.0**头部压缩**和头信息表减少每次发送的头部信息和**服务器推送**
  4. 使用 HTTP 缓存，强缓存 协商缓存
  5. 服务器使用 gzip 压缩

- 在 html 渲染阶段（这部分前端能直接进行优化）
  1. service worker
  2. 资源懒懒加载
  - 在 vue 中使用动态加载的方式加载路由组件 () => import('./Foo.vue'), 将首屏加载的资源放在同有个模块中
    component: () => import(/_ webpackChunkName: "client-redirectPage", webpackPreload: true _/ "@client/views/home/index"),其他路透资源点击的时候才会去请求
  3. 图片懒加载
  4. 资源预加载，将所有所需的资源提前请求加载到本地，这样后面在需要用到时就直接从缓存取资源。如preload和prefetch
  ```javascript
  function preload() {
    for (i = 0; i < preload.arguments.length; i++) {
      images[i] = new Image();

      images[i].src = preload.arguments[i];
    }
  }

  preload(
    "http://domain.tld/gallery/image-001.jpg",

    "http://domain.tld/gallery/image-002.jpg",

    "http://domain.tld/gallery/image-003.jpg"
  );
  ```

- 代码阶段
  1. 合理使用 localStorage


##### preload 和 prefetch 的区别
如何区分 preload 和 prefetch

preload   提高资源加载的优先级，是告诉浏览器页面必定需要的资源，浏览器一定会加载这些资源；
prefetch 是告诉浏览器页面可能需要的资源，在所有资源加载完毕后，将会加载prefetch的资源


##### 从URL到显示优化过程
1. 减少DNS解析时间，即DNS缓存和预解析
 - 默认情况下浏览器会对页面中和当前域名（正在浏览网页的域名）不在同一个域的域名进行预获取，并且缓存结果，这就是隐式的 DNS Prefetch。如果想对页面中没有出现的域进行预获取，那么就要使用显示 DNS Prefetch 了。
 DNS预解析具体用法
  //用meta信息来告知浏览器, 当前页面要做DNS预解析
  <meta http-equiv="x-dns-prefetch-control" content="on">
  在页面header中使用link标签来强制对DNS预解析: 
  <link rel="dns-prefetch" href="//www.zhix.net">

2. HTTP连接时，减少HTTP请求数
- 传输过程
  - 利用webpack制作雪碧图。
  - 将多个文件合并。但是注意在HTTP1.1中文件不应该太大，否则会阻塞后面的请求，在HTTP2.0中可以不需要考虑HTTP连接数，只需要考虑带宽。

3. 传输文件大小
  - 服务器或webpack使用gzip压缩
  
4. 文档解析过程
  - 使用缓存静态文件。使用强缓存
  - 在vue项目中，动态组件，将路由文件分开打包，实现资源懒加载。 
  - 图片懒加载
    1. offsetTop/getBoundingRect 配合 scroll事件 实现
    2. intersection observer配合其回调函数实现 检测元素是否在视窗中
    ```javascript
    document.addEventListener("DOMContentLoaded", function() {
        var lazyloadImages = document.querySelectorAll(".lazy");
        var imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var image = entry.target;
                    image.src = image.dataset.src;
                    image.classList.remove("lazy");
                    imageObserver.unobserve(image);
                }
            });
        });
        lazyloadImages.forEach(function(image) {
            imageObserver.observe(image);
        });
    });
    ```
  - 文件预加载 preload， 将字体等需要提前加载的文件优先级提前，尽快下载
  - 防抖动、节流
  - 事件代理
  - 减少回流



  