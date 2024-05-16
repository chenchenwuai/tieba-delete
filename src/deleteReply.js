import cheerio from 'cheerio';
import { request } from './request.js';
const tag = 'REPLY' // 回复
import { getTBS } from './utils.js';

let requestInterval = 350
let tbs = ''

// 删除多个
export async function ReplyDeleteMultiple(config) {

  let { start, end, interval } = config
  requestInterval = interval || 350
  if(!start || !end){
    if(start){
      end = start
    }else if(end){
      start = end
    }else{
      console.log(`${tag}: Please set start or end `)
      return false
    }
  }else if(start > end){
    start = end
  }

  const list = await getMultiplePage(start,end)
  const len = list.length
  if (len === 0) {
    console.log(`${tag}: Finished`)
    return false
  }

  for (let index = len - 1; index >= 0; index--) {
    console.log(`${tag}: -----Start Deleting No.${index + 1}----------------------`)
    const status = await deleteOne(list[index])
    if(status !== true && status && status.err_code == 220034){
      console.log(`${tag}: >>> Delete Limit <<< , Please try again tomorrow!`)
      return false
    }
  }
  console.log(`${tag}: Finished`)
}

// 删除一个
export async function deleteOne(params) {
  tbs = await getTBS()
  if(!tbs){
    console.log(`${tag}: 请重新登陆，并设置cookie! `)
    return false
  }

  const fd = new URLSearchParams()
  Object.keys(params).forEach(key => {
    fd.append(key, params[key])
  })
  fd.append('tbs',tbs)

  const url = 'https://tieba.baidu.com/f/commit/post/delete'
  const response = await request(url, {
    method: 'POST',
    body: fd
  })
  const data = await response.json()

  return new Promise(resolve => {
    setTimeout(() => {
      if (data.err_code === 0) {
        console.log(`${tag}: Delete Successed!`)
        resolve(true)
      } else {
        console.log(`${tag}: Delete Error:`, JSON.stringify(data))
        resolve(data)
      }
    }, requestInterval)
  })
}

// 获取多页
export async function getMultiplePage(start, end) {
  console.log(`${tag}: Getting, page:${start}->${end}`)
  const data = []
  for (let page = end; page >= start; page--) {
    let list = await getOnePage(page)
    data.push(...list)
  }
  console.log(`${tag}: Got Total: ${data.length}`)
  return data
}

// 获取一页评论
export async function getOnePage(page) {
  const url = `http://tieba.baidu.com/i/i/my_reply?&pn=${page}`
  const response = await request(url)
  const data = await response.text()
  const $ = cheerio.load(data)
  const list = $('a.b_reply').map((index, el) => {
    const href = $(el).attr('href')
    let tid = href.match(/\/p\/([0-9]+)/) 
    tid = tid && tid[1] || null // 帖子id
    let pid = href.match(/pid=([0-9]+)/)
    pid = pid && pid[1] || null
    let cid = href.match(/cid=([0-9]+)/)
    cid = cid && cid[1] || null

    if (cid && cid != 0) { // cid != 0, 表示是楼中楼回复
      pid = cid
    }
    return { tid, pid }
  });
  return new Promise(resolve=>{
    setTimeout(()=>{
      console.log(`${tag}: Got, page:${page}, number:${list.length}`)
      resolve(list)
    },requestInterval)
  })
}
