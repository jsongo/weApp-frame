//app.js
App({
  onLaunch: function () {
  },
  getPics: function() {
      return this.globalData.picList;
  },
  globalData:{
      picList: [] // 图片列表
  }
});