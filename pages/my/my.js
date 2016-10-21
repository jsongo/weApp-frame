
var app = getApp()
Page({
    data: {
        actionSheetHidden: true,
        // msg
        toastHidden: true,
        toastMsg: 'message'
    },
    onLoad: function () {
        console.log('onLoad');
        wx.setNavigationBarTitle({
            title:"个人中心"
        });
    },
    logout: function() {
        this.setData({
            actionSheetHidden: false
        });
    },
    doLogout: function() {
        // TODO: do some logout action here
        this.actionSheetChange();
        this.toast('注销成功！');
    },
    actionSheetChange: function() {
        this.setData({
            actionSheetHidden: !this.data.actionSheetHidden
        });
    },
    toast: function(msg) {
        this.setData({
            toastHidden: false,
            toastMsg: msg
        });
    },
    toastChange: function(event) {
        if (event.detail.value === false) {
            this.setData({
                toastHidden: true
            });
        }
    }
})
