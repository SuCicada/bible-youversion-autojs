const {getDailyS3KeyName} = require("../server/utils");
const {getFileFromS3} = require("../server/s3");
const dotenv = require('dotenv');
dotenv.config();

let date = process.argv[2];
let key = getDailyS3KeyName(date);
console.log(key);
getFileFromS3(process.env.AWS_S3_BUCKET_NAME, key).then(data => {
  console.log(data);
}).catch(err => {
  console.error(err);
})
