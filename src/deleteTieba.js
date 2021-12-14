const cheerio = require('cheerio')
const { request } = require('./request')
const tag = 'TIEBA' // 关注的贴吧

let requestInterval = 350
// 删除多个
async function deleteMultiple(config) {

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
    const status = await deleteOne(list[0])
    if(status !== true && status && status.err_code == 220034){
      console.log(`${tag}: >>> Delete Limit <<< , Please try again tomorrow!`)
      return false
    }
  }
  console.log(`${tag}: Finished`)
}

// 删除一个
async function deleteOne(params) {
  const fd = new URLSearchParams()
  Object.keys(params).forEach(key => {
    fd.append(key, params[key])
  })

  const url = 'http://tieba.baidu.com/f/like/commit/delete'
  const response = await request(url, {
    method: 'POST',
    body: fd
  })
  try {
    const data = await response.json()
    return new Promise(resolve => {
      setTimeout(() => {
        if (data.no === 0) {
          console.log(`${tag}: Delete Successed!`)
          resolve(true)
        } else {
          console.log(`${tag}: Delete Error:`, JSON.stringify(data))
          resolve(data)
        }
      }, requestInterval)
    })
  } catch (error) {
    console.log(`${tag}: Delete Error:`, JSON.stringify(error))
    return false
  }
}

// 获取多页
async function getMultiplePage(start, end) {
  console.log(`${tag}: Getting, page:${start}->${end}`)
  const data = []
  for (let page = end; page >= start; page--) {
    let list = await getOnePage(page)
    data.push(...list)
  }
  console.log(`${tag}: Got Total: ${data.length}`)
  return data
}

// 获取一页
async function getOnePage(page) {
  const url = `http://tieba.baidu.com/f/like/mylike?pn=${page}`
  const response = await request(url)
  const data = await response.text()
  const $ = cheerio.load(data)
  const list = $('span').map((index, el) => {
    return {
      tbs: $(el).attr('tbs'),
      fid: $(el).attr('balvid'),
      fname: $(el).attr('balvname')
    }
  });
  return new Promise(resolve=>{
    setTimeout(()=>{
      console.log(`${tag}: Got, page:${page}, number:${list.length}`)
      resolve(list)
    },requestInterval)
  })
}

module.exports.deleteTieba = deleteMultiple