
var app = getApp()
Page({
    data: {
        actionSheetHidden: true,
        // msg
        toastHidden: true,
        toastMsg: 'message',
        modalHidden: true,
        modalTitle: '',
        modalContent: 'attention!'
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
    },
    showAbout: function() {
        this.setData({
            modalTitle: '关于',
            modalContent: '这是一个演示程序，不要在意这些细节',
            modalHidden: false
        });
    },
    modalChange: function() {
        this.setData({
            modalHidden: !this.data.modalHidden
        });
    }
})
