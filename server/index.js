const express = require('express');
const fs = require("node:fs");
const cors = require('cors');
const {uploadFileToS3} = require("./s3");
const {getDailyS3KeyName, getDailyFileName, getDailyDate} = require("./utils");
let alert = require('./alert')
const {setRoutes} = require("./route");
const app = express();
const port = 41403;

// 设置静态文件目录

app.use(cors())
// 解析 JSON 请求体
app.use(express.json());
// 定义路由
app.post('/bible_pray', async (req, res) => {
  let data = req.body
  console.log(data)

  if (fs.existsSync('data') === false) {
    fs.mkdirSync('data')
  }

  let date = data.date ?? getDailyDate()

  let file = getDailyFileName(date)
  fs.writeFileSync(file, JSON.stringify(data, null, 2))

  let key = getDailyS3KeyName(date);
  uploadFileToS3(process.env.AWS_S3_BUCKET_NAME, key, file);

  await alert({
    date, file, key,
    body: `# [bible-autojs] Finish 祈り 🙏${data.date} `,
  })

  res.send({
    status: 'ok'
  });
});

setRoutes(app);

// 启动服务器
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running at http://localhost:${port}`);
});
