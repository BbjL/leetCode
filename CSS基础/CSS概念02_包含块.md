##### 什么是包含块
一个元素的尺寸和位置经常受其包含块(containing block)的影响。大多数情况下，包含块就是这个元素最近的祖先块元素的内容区，但也不是总是这样。

##### 初始包含块
根元素的包含块成为初始包含块，根元素通常为HTML，有的浏览器则会body，初始包含块的大小为一个视口大小的矩形

##### 普通元素的包含块
最近的祖先元素

##### 浮动元素的包含块
最近的**块级**祖先元素内容边框构成

##### 定位元素的包含块
1. position为relative、static
包含块为最近的块级框、表单元格、行内块的内容区边框

2. position为absolute
包含块为最近的开启定位的祖先元素
  - 祖先元素为块级
    包含块的大小为**边框**(不包括margin)界定的大小
  - 祖先元素为行内元素
    包含块大小为内容区大小

3. position为fixed
包含块为初始包含块，即一个视口大小的矩形


##### 包含块的计算规则
要计算 height top 及 bottom 中的百分值，是通过包含块的 height 的值。如果包含块的 height 值会根据它的内容变化，而且包含块的 position 属性的值被赋予 relative 或 static ，那么，这些值的计算值为 auto。
要计算 width, left, right, **padding**, **margin** 这些属性由包含块的**width属性**的值来计算它的百分值。

