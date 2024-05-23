const express = require('express');
const fs = require("node:fs");
const { format } = require('date-fns');
const app = express();
const port = 41403;

// 设置静态文件目录

// 解析 JSON 请求体
app.use(express.json());

// 定义路由
app.post('/bible_pray', (req, res) => {
  console.log(req.body)

  const now = new Date();
  const formattedDate = format(now, 'yyyy-MM-dd');
  if(fs.existsSync('data') === false){
    fs.mkdirSync('data')
  }

  let file = `data/bible_pray_${formattedDate}.json`
  fs.writeFileSync(file, JSON.stringify(req.body, null, 2))

  res.send({
    status: 'ok'
  });
});


// 启动服务器
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running at http://localhost:${port}`);
});
