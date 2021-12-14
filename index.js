// const { getReplys } = require('./reply');
// const { deleteReplys } = require('./delete');
const fs = require("fs");
const { getTBS } = require('./src/utils')
const config = require('./config')
const { deleteReplies } = require('./src/deleteReply')
const { deletePosts } = require('./src/deletePost')
const { deleteConcerns } = require('./src/deleteConcern')
const { deleteTieba } = require('./src/deleteTieba')
const { deleteFans } = require('./src/deleteFans')

const cookie = fs.readFileSync('./cookie');

(async () => {

  if(!cookie){
    console.error('无效的cookie!')
    return false
  }

  const tbs = await getTBS()
  if(!tbs){
    console.error('cookie失效,请重新登陆,然后设置cookie!')
    return false
  }

  const { reply, post, concern, tieba, fans } = config
  
  if(reply.enable){
    console.log('---------------------------------------')
    console.log('开始删除评论...')
    await deleteReplies(reply)
  }

  if(post.enable){
    console.log('---------------------------------------')
    console.log('开始删除帖子...')
    await deletePosts(post)
  }
  
  if(concern.enable){
    console.log('---------------------------------------')
    console.log('开始取消关注的人...')
    await deleteConcerns(concern)
  }
  
  if(tieba.enable){
    console.log('---------------------------------------')
    console.log('开始取消关注的贴吧...')
    await deleteTieba(tieba)
  }
  
  if(fans.enable){
    console.log('---------------------------------------')
    console.log('开始移除粉丝...')
    await deleteFans(fans)
  }

})();