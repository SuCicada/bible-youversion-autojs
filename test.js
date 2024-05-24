// toastLog("test");
// className("android.view.View").
// let res = className("android.view.View").scrollable(true).depth(11).findOne().children();
// res[0].click();
// log(res[0]);
function scroll_up() {
    swipe(500, 500, 500, 1000, 100);
    toastLog("swipe 1");
    sleep(1000);
    swipe(500, 500, 500, 1000, 100);
    toastLog("swipe 2");
}

// scroll_up()
// sleep(1000);

// let res =  click("今日の聖句")
// let res = click(84,251,685,852)
// let res = click(300, 500)
// toastLog(res);

// let views = className("android.view.View").scrollable(true).depth(11).find()
// log("found views", views.length);
// views.forEach(view => {
//     // let wordsCard = views.children()[0]
//     // log(wordsCard);
//     // log(view);
//     view.children().forEach(child => {
//     log("=====================================")
//         log(child);
//     })
//     // view.click()
// })
function test() {
    let res = http.postJson(
        "http://192.168.50.17:3000/bible_pray", {
            bible: {
                bibleWords: "bibleWords",
                bibleDescription: "bibleDescription",
                // bibleQuestion: "bibleQuestion",
                biblePray: "biblePray"
            }
        })
    log(res)
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

// test()
let views = className("android.view.View").depth(7).find()

log(views.size());
log(views[1]);
log(views[1].contentDescription);
log(clearObj(views[1].contentDescription));
log(getViewText(views[1].contentDescription))
log(getViewText(views[1]) === "デボーション");

// findOne().children().forEach(child => {
//     var target = child.find(className("android.view.View")).filter(view =>
//         view.desc().match(/^聖句のガイド.*/)
//     )[0];
//     log(target);
//     // toastLog(target.desc())
// });
