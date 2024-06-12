const {format} = require("date-fns");
const path = require("path");

function getDailyDate() {
  return format(new Date(), 'yyyy-MM-dd');
}

function getDailyFileName(date) {
  let formattedDate = date;
  if (!date) {
    formattedDate = getDailyDate();
  }
  return `data/bible_pray_${formattedDate}.json`;
}

function getDailyS3KeyName(date) {
  let file = getDailyFileName(date);
  return path.join(process.env.AWS_S3_KEY_PREFIX, file);
}

module.exports = {
  getDailyDate,
  getDailyFileName,
  getDailyS3KeyName
}
