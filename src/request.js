import fs from 'fs';
import fetch from 'node-fetch';


const cookie = fs.readFileSync('./cookie');
// 请求
export async function request(url,options={}) {
  return await fetch(url, {
    headers:{ Cookie: encodeURI(cookie.toString('utf-8')) },
    ...options
  })
}

