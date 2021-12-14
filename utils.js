const { request } = require('./request')

// 获取tbs
async function getTBS() {
  const response = await request('http://tieba.baidu.com/dc/common/tbs')
  const data = await response.json()
  if(data && data.is_login && data.tbs){
    return data.tbs
  }else{
    return false
  }  
}

module.exports.getTBS = getTBS