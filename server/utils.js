const {format} = require("date-fns");
const path = require("node:path");

function getDailyFileName(date) {
  let formattedDate = date;
  if (!date) {
    const now = new Date();
    formattedDate = format(now, 'yyyy-MM-dd');
  }
  return `data/bible_pray_${formattedDate}.json`;
}

function getDailyS3KeyName(date) {
  let file = getDailyFileName(date);
  return path.join(process.env.AWS_S3_KEY_PREFIX, file);
}

module.exports = {
  getDailyFileName,
  getDailyS3KeyName
}
