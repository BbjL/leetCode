##### bfc是什么
块级格式化上下文，规定了内部的块级盒子如何进行进行布局

##### 布局规则
- 块级元素一行接着一行
- 内部垂直方向的距离由margin决定，相邻元素的margin会重叠
- 盒子内部影响不了外部，外部也无法影响内部，可以用来解决margin击穿
- 开启bfc的元素不会占用定位元素的位置，可以应用在两列布局
- 计算高度时，浮动元素也会计算在内

##### 如何开启BFC
- 根元素本身就是一个BFC盒子
- position为absolute fixed
- float
- overflow不为visible
- display为flex inline-flex inline-block table-ceil table-caption
