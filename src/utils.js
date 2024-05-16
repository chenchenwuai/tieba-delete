import { request } from './request.js';
// 获取tbs
export async function getTBS() {
  const response = await request('http://tieba.baidu.com/dc/common/tbs')
  const data = await response.json()
  if(data && data.is_login && data.tbs){
    return data.tbs
  }else{
    return false
  }  
}
