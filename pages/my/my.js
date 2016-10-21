
var app = getApp()
Page({
    data: {
        desc: 'my center Page'
    },
    onLoad: function () {
      console.log('onLoad');
      wx.setNavigationBarTitle({
          title:"个人中心"
      });
    }
})
