const express = require('express');
const fs = require("node:fs");
const app = express();
const port = 3000;

// 设置静态文件目录

// 解析 JSON 请求体
app.use(express.json());

// 定义路由
app.post('/bible_pray', (req, res) => {
  console.log(req.body)
  let file = `bible_pray_${new Date().getTime()}.json`
  fs.writeFileSync(file, JSON.stringify(req.body, null, 2))
  res.send({
    status: 'ok'
  });
});


// 启动服务器
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running at http://localhost:${port}`);
});
