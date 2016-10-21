
//获取应用实例
var app = getApp()
Page({
    data: {
        items: null,
        winH: 0,
        curIndex: 0
    },
    
    onLoad: function (options) {
        var that = this;
        wx.getSystemInfo({
            success: function( res ) {
                // 一起setData

                // 跳过来时带的参数
                console.log(options.index);

                that.setData({
                    winH: res.windowHeight,
                    curIndex: options.index || 0
                });
            }
        });
    },
    
    onShow: function() {
        // 设置图片列表（的引用）
        var imgs = app.getPics(); // imgs是index页面里的data.items的引用 

        // 在onShow的时候设置，因为每次从列表回来都要更新一下图片列表
        this.setData({
            items: imgs || []
        });
    }
});
