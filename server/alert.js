async function alert(data) {
  let requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      format: 'markdown',
      // title: `[bible-autojs] Finish pray 📅${data.date} `,
      body: `# [bible-autojs] Finish 祈り 🙏${data.date} `,
//       body: `
// 🙏 聖書の祈り が完了しました：${data.date}
//
// 📁 ファイルは保存されました：\`${data.file}\`
//
// ☁️ ファイルは S3 にアップロードされました： \`${data.key}\`
//       `
    }),
  };
  let url = process.env.ALERT_URL;
  // url += "?format=markdown"
  let result = await fetch(url, requestOptions)
    .then(response => response.text())
    .catch(error => console.log('error', error));
  console.log(result);
  // .then(result => console.log(result))
}


module.exports = alert;
