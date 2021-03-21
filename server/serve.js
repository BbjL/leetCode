const express = require('express')
const app = express();


app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.get('/test_get', function (req, res) {
  res.send('hi this is get api')
})

app.post('/test_post', function (req, res) {
  res.send('hi this is post api')
})

const server = app.listen(8089, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log('接口地址为http://%s:%s', host, port)
})