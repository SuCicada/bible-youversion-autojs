const {listFilesFromS3, getFileFromS3} = require("./s3");
const path = require("path");
const {getDailyFileName, getDailyS3KeyName, getDailyDate} = require("./utils");
let alert = require('./alert')

function setRoutes(app) {
  app.get('/list', async (req, res) => {
    const {offset = 0, limit = 0} = req.query;
    let files = await listFilesFromS3(process.env.AWS_S3_BUCKET_NAME
      , path.join(process.env.AWS_S3_KEY_PREFIX, "data")
    )
    files = files.map(item => {
      return path.basename(item)
    }).sort().reverse()

    let data = files
    if (limit > 0) {
      data = files.slice(offset, offset + limit)
    }
    res.json({
      data: data
    });
  });

  app.get("/get/:date", async (req, res) => {
    let date = req.params.date
    let key = getDailyS3KeyName(date)
    console.log("get", date, key)
    let data = await getFileFromS3(process.env.AWS_S3_BUCKET_NAME, key)
    res.json(
      JSON.parse(data)
    )
  })

  app.get("/check_today", async (req, res) => {
    const date = getDailyDate()
    let key = getDailyS3KeyName(date)
    console.log("check_today", key)
    try {
      let data = await getFileFromS3(process.env.AWS_S3_BUCKET_NAME, key)
      res.json(JSON.parse(data))

    } catch (e) {
      if (e.code === 'NoSuchKey') {
        await alert({
          body: `# [bible-autojs]❗今日まだ祈っていない ${date} `,
        })
        res.json({status: 'not found'})
      } else {
        res.json({status: 'error', message: e.message})
      }
    }
  })
}

module.exports = {
  setRoutes
}