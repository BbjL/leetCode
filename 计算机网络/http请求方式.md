

##### http请求方式
- get
- post
- put
- delete
- option
- head
- patch


##### post 和 get 的区别
- 最直观的区别，get用来获取数据，post用来发送数据
- 传输数据大小 get最长2048字节），而post无限制。
- 安全性。如果使用get请求敏感操作，容易收到csrf攻击导致用户的损失