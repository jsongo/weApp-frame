//index.js
//获取应用实例
var app = getApp();
var MAX_PREPEND = 3; // 用来控制下拉刷新时，最多加载的次数
Page({
    data: {
        items: [],
        winH: 0
    },
    curPage: 1,
    max: 0,
    loading: false,
    prependCnt: MAX_PREPEND,
    cntPerPage: 20, // 每次加载多少个

    onLoad: function () {
        console.log('onLoad');
        this.fetchPage(this.curPage++);

        wx.getSystemInfo({
            success: ( res ) => { // 用这种方法调用，this指向Page
                this.setData({
                    winH: res.windowHeight
                });
            }
        });
        
        // 把data.items的引用存到app里
        app.globalData.picList = this.data.items;
    },

    onShow: function() {
        wx.setNavigationBarTitle({
            title: "花瓣列表"
        });
    },

    loadMore: function(event) {
        console.log('loading...');
        this.fetchPage(this.curPage++);
    },

    scroll: function() {
        console.log('scroll');
    },

    // 下拉刷新时触发
    onPullDownRefresh: function() {
        console.log('pulling down');
        var isPrepend = true; // 往前加
        this.prependCnt --;
        this.fetchPage(1, isPrepend, this.prependList);
    },

    fetchPage: function(pageNo, isPrepend, callback) {
        if (this.loading) {
            console.log('Prevented for the other request is processing...');
            return;
        }

        var url = 'http://huaban.com/favorite/photography/?limit=' + this.cntPerPage + '&wfl=' + pageNo;
        if (!isPrepend && this.max) {
            url +=  '&max=' + this.max;
        }

        var that = this;
        this.loading = true;
        wx.showToast({
            title: '加载中...',
            icon: 'loading',
            duration: 10000
        });
        // 显示标题栏的加载图标
        wx.showNavigationBarLoading();

        wx.request({
            url: url,
            header: {
                'X-Request': 'JSON'
            },
            success: function(res) {
                console.log(res.data);
                if (!callback) {
                    that.renderList(res.data);
                }
                else {
                    callback.call(null, res.data);
                }
            },
            // complete方法
            complete: function() {
                this.loading = false
                wx.hideToast();
                // 隐藏标题栏的加载图标
                wx.hideNavigationBarLoading();
                
                // 停止下拉的加载图标，可以在网络加载完时调用
                wx.stopPullDownRefresh();
            }
        });
    },
    
    packItem: function(item) { // 把返回的列表数据的每一项打包成本项目需要的格式
        var d = {
            id: item && item.pin_id || 0,
            img: item && item.file && ('http://img.hb.aicdn.com/' + item.file.key) || '',
            desc: item && item.raw_text || '图片来自花瓣'
        };
        return d;
    },

    renderList: function(data) {
        var len = this.data.items.length,
            list = data && data.pins || [];
        if (list.length <= 0) {
            this.loadMoreBackup = this.loadMore;
            this.loadMore = ()=>{}; // 重置成空
        }
        var item = null;
        for (item of list) {
            var d = this.packItem(item);
            if (d.img) {
                this.setData({
                    ['items[' + (len++) + ']']: d
                });
            }
        }
        this.max = item && item.pin_id;
    },

    // 顶部添加新项，拉取更新后的render
    prependList: function(data) {
        var firstId = this.data.items[0].id,
            list = data && data.pins;
        console.log(firstId);
        var extraData = [];
        // 只追加新项
        for (var item of list) {
            var id = item && item.pin_id;
            if (id && id === firstId) { // 遇到第一项就停止
                break;
            }
            var d = this.packItem(item);
            if (d.img) {
                extraData.push(d);
            }
        }
        if (extraData.length > 0) {
            var items = this.data.items;
            items.unshift(...extraData);

            this.setData({
                items: items
            });
        }

        // 看还有没有更多
        if (this.prependCnt >= 0 && extraData.length >= list.length) {
            this.onPullDownRefresh(); // 再模拟一次调用
        }
        else {
            this.prependCnt = MAX_PREPEND;
        }
    }
})
