const {format} = require("date-fns");
const path = require("node:path");

function getDailyFileName() {
  const now = new Date();
  const formattedDate = format(now, 'yyyy-MM-dd');
  return `data/bible_pray_${formattedDate}.json`;
}

function getDailyS3KeyName() {
  let file = getDailyFileName();
  return path.join(process.env.AWS_S3_KEY_PREFIX, file);
}

module.exports = {
  getDailyFileName,
  getDailyS3KeyName
}
