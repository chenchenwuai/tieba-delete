// const { getReplys } = require('./reply');
// const { deleteReplys } = require('./delete');
const fs = require("fs");
const { getTBS } = require('./utils')
const config = require('./config')
const { deleteReplies } = require('./deleteReply')
const { deleteConcerns } = require('./deleteConcern')
const { deleteTieba } = require('./deleteTieba')
const { deleteFans } = require('./deleteFans')

const cookie = fs.readFileSync('./cookie');

(async () => {

  if(!cookie){
    throw new Error('Invalid Cookie!')
  }

  const tbs = await getTBS()
  if(!tbs){
    throw new Error('Please Login Again!')
  }

  const { reply, concern, tieba, fans } = config
  
  if(reply.enable){
    console.log('---------------------------------------')
    console.log('Start Delete Reply...')
    await deleteReplies(reply)
  }
  
  if(concern.enable){
    console.log('---------------------------------------')
    console.log('Start Delete Concern...')
    await deleteConcerns(concern)
  }
  
  if(tieba.enable){
    console.log('---------------------------------------')
    console.log('Start Delete Tieba...')
    await deleteTieba(tieba)
  }
  
  if(fans.enable){
    console.log('---------------------------------------')
    console.log('Start Delete Fans...')
    await deleteFans(fans)
  }

})();