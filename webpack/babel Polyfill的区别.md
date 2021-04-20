




##### Babel Polyfill的作用
- Babel:Babel 是一个广泛使用的 ES6 转码器，可以将 ES6 代码转为 ES5 代码。注意：Babel 默认只转换新的 JavaScript 句法（syntax），而不转换新的 API。有的同学可能分不清哪些是ES6句法，哪些是API，这个暂时先放一放，后面会讲。

- Polyfill:Polyfill的准确意思为，用于实现浏览器并不支持的原生API的代码。

##### Babel的处理步骤
Babel 的三个主要处理步骤分别是：解析（parse），转换（transform），生成（generate）。

解析
解析步骤接收代码并输出 AST。这个步骤分为两个阶段：词法分析（Lexical Analysis）和 语法分析（Syntactic Analysis）。

转换
转换步骤接收 AST 并对其进行遍历，在此过程中对节点进行添加、更新及移除等操作。

生成
将转换后的 AST 通过 babel-generator 再转换成 js 代码，过程是深度遍历整个 AST，然后构建可以表示转换后代码的字符串。

[babel 和 Polyfill的区别](https://www.cnblogs.com/zhansu/p/8305081.html)

