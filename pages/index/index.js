//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        items: [],
        loading: false,
        winH: 0
    },
    curPage: 1,
    max: 0,

    onLoad: function () {
        console.log('onLoad');
        this.fetchPage(this.curPage++);

        var that = this;
        wx.getSystemInfo({
            success: function( res ) {
                that.setData({
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
        this.fetchPage(1, isPrepend, this.prependList);
    },

    fetchPage: function(pageNo, isPrepend, callback) {
        if (this.data.loading) {
            console.log('Prevented for the other request is processing...');
            return;
        }

        var url = 'http://huaban.com/favorite/photography/?limit=20&wfl=' + pageNo;
        if (!isPrepend && this.max) {
            url +=  '&max=' + this.max;
        }

        var that = this;
        that.setData({
            loading: true
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
                that.setData({
                    loading: false
                });
                // 隐藏标题栏的加载图标
                wx.hideNavigationBarLoading();
                
                // 停止下拉的加载图标，可以在网络加载完时调用
                wx.stopPullDownRefresh();
            }
        });
    },
    
    packItem: function(item) {
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

    prependList: function(data) {
        var firstId = this.data.items[0].id,
            list = data && data.pins;
        console.log(firstId);
        var extraData = [];
        for (var item of list) {
            var id = item && item.pin_id;
            if (id && id === firstId) {
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
    }
})
