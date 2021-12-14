const fs = require("fs");
const fetch = require('node-fetch')

const cookie = fs.readFileSync('./cookie');
// 请求
async function request(url,options={}) {
  return await fetch(url, {
    headers:{ cookie },
    ...options
  })
}

module.exports.request = request