console.log(files.cwd());

// const PRAY_SERVER_API = "http://192.168.50.17:41403/bible_pray"
const PRAY_SERVER_API = "http://192.168.50.196:41403/bible_pray"

function openApp() {
  // home();
  // sleep(1000);
  let app_package = "com.sirma.mobile.bible.android"
  let res = app.launch(app_package);
  toastLog(res);
  sleep(10 * 1000);
}

let dailyPrayData = {}

let bibleWords = ""
let bibleDescription = ""
let bibleQuestion = {question: "", answer: []}
let biblePray = ""

function dealBibleGuide() {
  function open() {
    // let res = click("聖句のガイド")
    let res = click(300, 1000)
    toastLog("click 聖句のガイド", res);
    sleep(5000)
  }

  function words() {
    let res = className("android.view.View").depth(8).findOne()
    let str = ""
    res.children().forEach(child => {
      // log("=====================================")
      // log(child.contentDescription);
      // if (child.contentDescription) {
      str += child.contentDescription
      // }
    })
    bibleWords = str
  }

  function page2() {
    function gotoPlanMode() {
      function enter() {
        let res = click(377, 1362)
        toastLog("enter 続きを読む", res);
      }

      enter()
      sleep(5000)

      // let res = className("ScrollView").findOne().children()[1]
      let views = className("android.view.View").depth(8).find()
      let res = views[1]
      // console.log(res)
      // console.log(res.contentDescription)
      bibleDescription = res.contentDescription

      sleep(2000)
      back()
      sleep(2000)
    }

    function gotoDevotionMode() {
      let views = className("android.view.View").depth(10).find()
      let res = views[0]
      bibleDescription = res.contentDescription
      sleep(2000)
    }

    let views = className("android.view.View").depth(7).find()
    if (views.size() === 2 && getViewText(views[1]) === "デボーション") {
      gotoDevotionMode()
    } else {
      gotoPlanMode()
    }
  }

  function furikaeri() {
    let views = className("android.view.View").depth(8).findOne().children()
    let question = views[1].contentDescription
    let answer1 = views[2].contentDescription
    let answer2 = views[3].contentDescription
    let answer3 = views[4].contentDescription
    bibleQuestion = {
      question: question,
      answer: [answer1, answer2, answer3]
    }
    // let res = click("振り返り")
  }

  function inori() {
    let views = className("android.view.View").depth(8).findOne().children()
    biblePray = views.map(child => child.contentDescription).join("")
  }

  function nextPage() {
    let res = click(654, 795)
    toastLog("click 次のページへ", res);
    sleep(3000)
    // let res = className("android.widget.Button").desc("次のページへ").findOne()
// toastLog(res)
  }

  function run() {
    open()
    words()
    nextPage()
    page2()
    nextPage()
    furikaeri()
    nextPage()
    inori()
    nextPage()

    // end
    back()
    sleep(3000)
  }

  run()
  // page2()

  // console.show();
  // console.log("wewewee")
  // log(bibleWords)
  // log(bibleDescription)
  // log(bibleQuestion)
  // log(biblePray)
}

let prayPreface = ""
let prayPraiseGod = ""
let prayThinking = ""
let prayWords = ""
let prayEnd = ""

function dealPrayGuide() {
  function open() {
    // let res = click("聖句のガイド")
    let res = click(300, 1300)
    toastLog("click 祈りのガイド", res);
    sleep(5000)
  }

  function hajime() {
    let views = className("android.view.View").depth(8).findOne().children()
    prayPreface = views[1].contentDescription
    log("prayPreface", prayPreface)
  }

  function nextPage() {
    let res = click(650, 1400)
    toastLog("click 次のページへ", res);
    sleep(3000)
  }

  // 神をほめたたえましょう
  function homeitatae() {
    let views = className("android.view.View").depth(9).find()
    let title = views[0].contentDescription
    if (views.size() >= 3) {
      let words = views[1].children().map(child => child.contentDescription).join("")
      let description = views[2].contentDescription
      prayPraiseGod = {
        title, words, description
      }
    } else if (views.size() === 2) {
      let description = views[1].contentDescription
      prayPraiseGod = {
        title, description,
      }
    }
    // let words = views[1].children().map(child => child.contentDescription).join("")
    // let description = views[2].contentDescription
    // log(description)
  }

  function omoukoto() {
    let views = className("android.view.View").depth(9).find()
    let title = views[0].contentDescription
    if (views.size() >= 3) {
      let words = views[1].children().map(child => child.contentDescription).join("")
      let description = views[2].contentDescription
      prayThinking = {
        title, words, description
      }
    } else if (views.size() === 2) {
      let description = views[1].contentDescription
      prayThinking = {
        title, description,
      }
    }
  }

  function pray() {
    let views = className("android.view.View").depth(9).find()
    let title = views[0].contentDescription
    if (views.size() >= 3) {
      let words = views[1].children().map(child => child.contentDescription).join("")
      let description = views[2].contentDescription
      prayWords = {
        title, words, description
      }
    } else if (views.size() === 2) {
      let description = views[1].contentDescription
      prayWords = {
        title, description,
      }
    }
    // let words = views[1].contentDescription
    // prayWords = {
    //   title, words,
    // }
  }

  function musubi() {
    let views = className("android.view.View").depth(9).find()
    prayEnd = views[1].contentDescription
  }

  open()
  hajime()
  nextPage()
  homeitatae()
  nextPage()
  omoukoto()
  nextPage()
  pray()
  nextPage()
  musubi()

  back()
  sleep(3000)
  // log(prayPreface)
  // log(prayThinking)
  // log(prayWords)
  // log(prayEnd)
}

function clearObj(obj) {
  let s = JSON.stringify(obj)
  return JSON.parse(s)
}

function getViewText(view) {
  if (view) {
    if (view.contentDescription) {
      view = view.contentDescription
    }
    return typeof view === "object" ? clearObj(view).mText : view
  }
  return view
}

function clearPray(pray) {
  return {
    title: getViewText(pray.title),
    words: getViewText(pray.words),
    description: getViewText(pray.description)
  }
}

function collectPrayData() {
  dailyPrayData = {
    bible: {
      bibleWords,
      bibleDescription: clearObj(bibleDescription).mText,
      bibleQuestion: {
        question: clearObj(bibleQuestion).question.mText,
        answer: clearObj(bibleQuestion).answer.map(item => item.mText)
      },
      biblePray
    },
    pray: {
      prayPreface: clearPray(prayPreface),
      prayPraiseGod: clearPray(prayPraiseGod),
      prayThinking: clearPray(prayThinking),
      prayWords: clearPray(prayWords),
      prayEnd: getViewText(prayEnd)
    }
  }
  // let json = JSON.stringify(dailyPrayData)
  // dailyPrayData = JSON.parse(json)
  // dailyPrayData.bible.bibleDescription = dailyPrayData.bible.bibleDescription.mText
}

function sendPrayData() {
  let res = http.postJson(
    PRAY_SERVER_API, dailyPrayData)
  log(res.body.string())
}

function main() {
  openApp();
  toastLog("open app over");

  dealBibleGuide();
  toastLog("dealBibleGuide over");

  dealPrayGuide();
  toastLog("dealPrayGuide over");

  collectPrayData()
  let json = JSON.stringify(dailyPrayData)
  log(dailyPrayData)
  log(json)
  sendPrayData()

  toastLog("all over");
}

function test() {
  dealBibleGuide();
  collectPrayData()

  log(dailyPrayData)
  log(JSON.stringify(dailyPrayData))
  sendPrayData()
}

// test()
main()

// let a = className("android.view.View").depth(10).findOne()
// toastLog(a);
// Camera()
// device.vibrate(1000);

// app.launch("com.android.systemui");
// //打开应用来查看图片文件
// var i = app.intent({
//     action: "VIEW",
//     type: "image/png",
//     data: "file:///sdcard/1.png"
// });
// // context.startActivity(i);
//
// importClass(android.content.Context);
// importClass(android.hardware.display.DisplayManager);
// importClass(android.media.MediaRecorder);

// MediaProjectionManager = context.getSystemService(Context.MEDIA_PROJECTION_SERVICE);
// var i = MediaProjectionManager.createScreenCaptureIntent();
// i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

// // app.startActivity({
// //     action: "ACTION_LAUNCH_CAPTURE_CONTENT_ACTIVITY_FOR_NOTE",
// //     // type: "text/plain",
// //     // data: "file:///sdcard/1.txt"
// // });

// // var i = app.intent({
// //     action: "ACTION_LAUNCH_CAPTURE_CONTENT_ACTIVITY_FOR_NOTE",
// //     // type: "image/png",
// //     // data: "file:///sdcard/1.png"
// // });
// context.startActivity(i);
