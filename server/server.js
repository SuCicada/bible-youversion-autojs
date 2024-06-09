const express = require('express');
const fs = require("node:fs");
const {format} = require('date-fns');
const {uploadFileToS3} = require("./s3");
const path = require("node:path");
const {getDailyS3KeyName, getDailyFileName} = require("./utils");
const app = express();
const port = 41403;

// 设置静态文件目录

// 解析 JSON 请求体
app.use(express.json());

// 定义路由
app.post('/bible_pray', (req, res) => {
  console.log(req.body)

  if (fs.existsSync('data') === false) {
    fs.mkdirSync('data')
  }


  let file = getDailyFileName()
  fs.writeFileSync(file, JSON.stringify(req.body, null, 2))

  let key = getDailyS3KeyName();
  uploadFileToS3(process.env.AWS_S3_BUCKET_NAME, key, file);

  res.send({
    status: 'ok'
  });
});


// 启动服务器
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running at http://localhost:${port}`);
});
