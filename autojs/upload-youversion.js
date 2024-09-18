const moment = require("moment.js")
// const PRAY_SERVER_API = "http://server.sucicada.me:41403/bible_pray"
const PRAY_SERVER_API = "http://192.168.50.88:41403/bible_pray"

const date = moment().format("YYYY-MM-DD")
function sendPrayData() {
  let filename = `/sdcard/bible-youversion-autojs/bible_pray_${date}.json`
  // files.createWithDirs("/sdcard/bible-youversion-autojs/")
  // files.write(filename, JSON.stringify(dailyPrayData))
  const dailyPrayDataStr =  files.read(filename)
  const dailyPrayData = JSON.parse(dailyPrayDataStr)
  let res = http.postJson(
    PRAY_SERVER_API, dailyPrayData)
  toastLog(res.body.string())
}

sendPrayData()