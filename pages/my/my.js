
var app = getApp()
Page({
    data: {
    },
    onLoad: function () {
        console.log('onLoad');
        wx.setNavigationBarTitle({
            title:"个人中心"
        });
    },
    doLogout: function() {
        // TODO: do some logout action here
        wx.showToast({
            title: '注销成功！',
            icon: 'success',
            duration: 3000,
            success: function(res) {
                if (res.confirm === 1) {
                    console.log('用户点击了确认按钮');
                }
                else {
                    console.log('用户点击了取消按钮');
                }
            }
        });
    },
    logout: function() {
        wx.showActionSheet({
            itemList: ['确定注销'],
            success: (res)=> {
                if (!res.cancel) {
                    if (res.tapIndex == 0) { // 确定注销
                        this.doLogout();
                    }
                }
            }
        });
    },
    showAbout: function() {
        wx.showModal({
            title: '关于',
            content: '这是一个演示程序，不要在意这些细节'
        });
    }
})
