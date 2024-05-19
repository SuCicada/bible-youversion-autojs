console.log(files.cwd());

function openApp() {
  // home();
  // sleep(1000);
  let app_package = "com.sirma.mobile.bible.android"
  let res = app.launch(app_package);
  toastLog(res);
  sleep(3000);
}

let dailyPrayData = {}

let bibleWords = ""
let bibleDescription = ""
let bibleQuestion = {}
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
    function enter() {
      let res = click(377, 1362)
      toastLog("enter 続きを読む", res);
    }

    enter()
    sleep(5000)

    let res = className("ScrollView").findOne().children()[1]
    bibleDescription = res.contentDescription
    sleep(2000)
    back()
    sleep(2000)
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
    sleep(3000)
  }

  function page1() {
    let views = className("android.view.View").depth(8).findOne().children()
    prayPreface = views[1].contentDescription
  }

  function nextPage() {
    let res = click(650, 1400)
    toastLog("click 次のページへ", res);
  }

  // 神をほめたたえましょう
  function homeitatae() {
    let views = className("android.view.View").depth(9).find()
    let title = views[0].contentDescription
    let words = views[1].children().map(child => child.contentDescription).join("")
    let description = views[2].contentDescription
    // log(description)
    prayPraiseGod = {
      title, words, description
    }
  }

  function omoukoto() {
    let views = className("android.view.View").depth(9).find()
    let title = views[0].contentDescription
    let words = views[1].children().map(child => child.contentDescription).join("")
    let description = views[2].contentDescription
    prayThinking = {
      title, words, description
    }
  }

  function pray() {
    let views = className("android.view.View").depth(9).find()
    let title = views[0].contentDescription
    let words = views[1].contentDescription
    prayWords = {
      title, words,
    }
  }

  function musubi() {
    let views = className("android.view.View").depth(9).find()
    prayEnd = views[1].contentDescription
  }

  // open()
  // page1()
  // nextPage()
  // homeitatae()
  // nextPage()
  // omoukoto()
  // nextPage()
  // pray()
  musubi()
  // log(prayPreface)
  // log(prayThinking)
  // log(prayWords)
  // log(prayEnd)
}

function collectPrayData() {
  dailyPrayData = {
    bible: {
      bibleWords,
      bibleDescription,
      bibleQuestion,
      biblePray
    },
    pray: {
      prayPreface,
      prayPraiseGod,
      prayThinking,
      prayWords,
      prayEnd
    }
  }
}

function main() {
  openApp();
  dealBibleGuide();
  // dealPrayGuide();

  collectPrayData()
  log(dailyPrayData)


  // log(res);
  // toastLog(app.versionCode);

  // for (let i = 0; i < 5; i++) {
  //     let a = waitForPackage(app_package);
  //     toastLog("wait",a);
  // }
  // swipe(500, 1000, 500, 500, 1000);
  // toastLog("test");
  // Tap(500, 500);
  // sleep(3000);
}

// require("./utils.js");
// toastLog(app);
main();
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
