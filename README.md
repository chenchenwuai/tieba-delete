# 贴吧删除器
删除我的贴吧记录[回复、帖子、关注、粉丝等]（~~也可以说删除以前不堪入目的黑历史~~）

## 使用方法
+ 设置cookie
  + 清空文件夹中cookie文件里面的内容
  + 打开[百度贴吧首页](https://tieba.baidu.com/index.html)，然后登录贴吧
  + 右键页面点击**检查**或者按**F12**进入**控制台**，然后点击**Network** 
  + 然后刷新页面，然后点击network下方列表中的第一个请求，名称为`tieba.baidu.com`
  + 找到右方的`Headers`中`Request Headers`中的`cookie`，然后右键选择复制
  + 将复制到的东西粘贴到cookie的文件中，不要忘记保存，(可参考images下面的`获取cookie`图片)
  + 当账号在次浏览器退出或重新登录后，cookie就失效了，需要重新设置cookie
+ 进行操作项配置，详细请查看`config.js`文件
+ 配置好之后，在当前路径下运行cmd
+ 输入`node index`或者`npm run start`开始执行删除

## 功能集合

- [x] 删除回复
- [x] 删除关注的人
- [x] 删除关注的贴吧
- [x] 删除粉丝 (粉丝太少，未完全测试)
- [ ] 删除帖子
