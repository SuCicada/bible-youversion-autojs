const AWS = require('aws-sdk');
const fs = require('fs');
const S3 = new AWS.S3();

// 直接在代码中配置
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

function uploadFileToS3(bucketName, key, filePath) {
  // 读取文件内容
  const fileContent = fs.readFileSync(filePath);

  // 设置上传参数
  const params = {
    Bucket: bucketName,
    Key: key, // 文件在S3中的路径和名称
    Body: fileContent
  };

  // 上传文件到S3
  S3.upload(params, function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Upload Success", data.Location);
    }
  });
}

async function getFileFromS3(bucketName, key) {
  const params = {
    Bucket: bucketName,
    Key: key
  };

  return new Promise((resolve, reject) => {
    S3.getObject(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.Body.toString());
      }
    });
  });
}

module.exports = {
  uploadFileToS3,
  getFileFromS3
}
