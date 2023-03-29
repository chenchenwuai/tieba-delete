const fs = require("fs");
const fetch = require('node-fetch')

const cookie = fs.readFileSync('./cookie');
// 请求
async function request(url,options={}) {
  return await fetch(url, {
    headers:{ Cookie: encodeURI(cookie.toString('utf-8')) },
    ...options
  })
}

module.exports.request = request
