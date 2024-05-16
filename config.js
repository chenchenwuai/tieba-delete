export const config = {
  reply:{     // 删除回复的配置
    enable: true,     // true->开启, false->关闭删除回复功能
    start: 1,        // 回复开始页 http://tieba.baidu.com/i/i/my_reply?&pn=1
    end: 2,          // 回复结束页 http://tieba.baidu.com/i/i/my_reply?&pn=2
    interval: 350     // 删除操作毫秒间隔，根据测试，间隔越小，每日可删除上限越高，风险也越高。建议200~500ms内
  },

  post:{     // 删除发布的帖子
    enable: true,     // true->开启, false->关闭删除回复功能
    start: 1,        // 回复开始页 http://tieba.baidu.com/i/i/my_tie?&pn=1
    end: 2,          // 回复结束页 http://tieba.baidu.com/i/i/my_tie?&pn=2
    interval: 350     // 删除操作毫秒间隔，根据测试，间隔越小，每日可删除上限越高，风险也越高。建议200~500ms内
  },

  concern:{     // 取消关注人的配置
    enable: true,
    start: 1,        // 开始页 http://tieba.baidu.com/i/i/concern?pn=1
    end: 2,          // 结束页 http://tieba.baidu.com/i/i/concern?pn=2
    interval: 350
  },

  tieba:{     // 取消关注贴吧的配置
    enable: false,
    start: 1,        // 开始页 http://tieba.baidu.com/f/like/mylike?pn=1
    end: 2,          // 结束页 http://tieba.baidu.com/f/like/mylike?pn=2
    interval: 350
  },

  fans:{     // 删除粉丝的配置
    enable: true,
    start: 1,        // 开始页 http://tieba.baidu.com/i/i/fans?pn=1
    end: 2,          // 结束页 http://tieba.baidu.com/i/i/fans?pn=2
    interval: 350
  },

}
