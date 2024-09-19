const {listFilesFromS3, getFileFromS3} = require("./s3");
const path = require("path");
const {getDailyFileName, getDailyS3KeyName, getDailyDate} = require("./utils");
let alert = require('./alert')
const {upsertPrayRecord, getPrayRecord, saveAudio, getAudio} = require("./sql");
const express = require("express");
const {format} = require("date-fns");

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


  const recordRouter = express.Router();

  recordRouter.post("/save/:date", async (req, res) => {
    let date = req.params.date
    date = dateTranslate(date)
    const title = req.body.title
    const furigana = req.body.furigana
    const result = await upsertPrayRecord(date, title, furigana)
    console.log("save", date, title, furigana, result)
    res.json(result)
  })
  recordRouter.get("/get/:date", async (req, res) => {
    let date = req.params.date
    date = dateTranslate(date)
    // const type = req.query.type
    const title = req.query.title
    const result = await getPrayRecord(date, title)
    console.log("get_record", date, title, result)
    res.json({status: 'ok', data: result})
  })
  recordRouter.post("/audio", async (req, res) => {
    let date = req.body.date
    let title = req.body.title
    let audioBase64 = req.body.audio
    if (!date || !title || !audioBase64) {
      res.json({status: 'error', message: 'date, title and audio required'})
      return
    }
    date = dateTranslate(date)

    let audioBytes = Buffer.from(audioBase64, 'base64');
    // const type = req.query.type
    const result = await saveAudio(date, title, audioBytes)
    console.log("save-audio", date, title, result)
    // res.json({status: 'ok', data: result})
    res.json(result)
  })
  recordRouter.get("/audio", async (req, res) => {
    let date = req.query.date
    let title = req.query.title
    if (!date || !title) {
      res.json({status: 'error', message: 'date and title required'})
      return
    }
    date = dateTranslate(date)
    const result = await getAudio(date, title)
    const audioBase64 = result.toString('base64')
    console.log("get-audio", date, title, result)
    res.json({status: 'ok', data: audioBase64})
  })


  app.use("/record", recordRouter);
}

function dateTranslate(date) {
  if (date.includes('-')) {
    return format(new Date(date), 'yyyyMMdd');
  }
  return date;
}

module.exports = {
  setRoutes
}