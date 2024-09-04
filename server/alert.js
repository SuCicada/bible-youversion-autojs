async function alert({body}) {
  let requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      format: 'markdown',
      // title: `[bible-autojs] Finish pray 📅${data.date} `,
      body: body
    }),
  };
  console.log("alert req ", requestOptions);
  let url = process.env.ALERT_URL;
  // url += "?format=markdown"
  let result = await fetch(url, requestOptions)
    .then(response => response.text())
    .catch(error => console.log('alert error', error));
  console.log("alert res ", result);
  // .then(result => console.log(result))
}


module.exports = alert;
