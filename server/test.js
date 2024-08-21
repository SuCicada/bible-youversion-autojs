

require('dotenv').config({
  path: require('path').resolve(__dirname, '../.env')
})
const nodemon = require('nodemon');

// 配置 nodemon
nodemon({
  script: 'index.js',          // 启动的主脚本
  // ext: 'js json',            // 监视的文件扩展名
  // ignore: ['node_modules/'], // 忽略的文件夹
  // env: { 'NODE_ENV': 'development' }, // 设置环境变量
});


// require("./index")