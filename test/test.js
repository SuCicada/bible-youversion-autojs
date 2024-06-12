let alert = require('../server/alert')
const {getDailyS3KeyName, getDailyFileName} = require("../server/utils");
 require('dotenv').config()
let key = getDailyS3KeyName();
let file = getDailyFileName()
alert({date:"2021-09-01",file,key})
