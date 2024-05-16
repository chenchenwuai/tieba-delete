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
  + 当账号在浏览器退出或重新登录后，cookie就失效了，需要重新设置cookie
+ 进行操作项配置，详细请查看`config.js`文件
+ 配置好之后，在当前路径下运行cmd
+ 输入`node index`或者`npm run start`开始执行删除

## 功能集合

- [x] 删除回复
- [x] 删除关注的人
- [x] 删除关注的贴吧
- [x] 删除粉丝 (粉丝太少，未完全测试)
- [x] 删除帖子

> 贴吧每日删除数量有上限，如果错误中出现`limit`等字样，请第二天在尝试

## 常见问题

### 如果没有 `cheerio` 模块怎么办
如果在运行过程中遇到 `Error: Cannot find module 'cheerio'` 错误，请按以下步骤操作：
1. 确保你在项目根目录下。
2. 运行以下命令安装 `cheerio` 模块：
   ```bash
   npm install cheerio
   ```
3. 如果仍有问题，可以尝试使用 `cnpm`（中国的 npm 镜像）来安装依赖。

### 配置 `cnpm`
`cnpm` 是 npm 镜像，可以加快国内用户的包安装速度。使用 `cnpm` 的步骤如下：
1. 在终端或命令行中运行以下命令全局安装 `cnpm`：
   ```bash
   npm install -g cnpm --registry=https://registry.npmmirror.com
   ```
2. 使用 `cnpm` 安装 `cheerio`：
   ```bash
   cnpm install cheerio
   ```

按照上述步骤配置好环境后，再次运行 `npm run start` 即可开始使用本工具删除贴吧记录。
