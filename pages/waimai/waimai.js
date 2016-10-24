
var app = getApp()
Page({
    data: {
        imgUrls: [
            '../../res/img/banner1.jpg',
            '../../res/img/banner2.jpg',
            '../../res/img/banner3.jpg'
        ],
        indicatorDots: true,
        autoplay: true,
        interval: 5000,
        duration: 1000,
        toastHidden: true,
        toastMsg: 'message',

        chosenType: 1, // 前面被选中的类型
        types: [{
                name: '热销',
                id: 1
            }, {
                name: '折扣',
                id: 2
            }, {
                name: '26元双拼套餐',
                id: 3
            }, {
                name: '新添新品',
                id: 4
            }, {
                name: '实惠专区',
                id: 5
            }, {
                name: '免辣专区',
                id: 6
            }, {
                name: '麻辣诱惑',
                id: 7
            }, {
                name: '米饭',
                id: 8
            }, {
                name: '土豪专区',
                id: 9
            }, {
                name: '舌尖上的诱惑',
                id: 10
            }, {
                name: '时令鲜蔬',
                id: 11
        }],
        dishes: []
    },

    onLoad: function () {
        console.log('onLoad');
        wx.setNavigationBarTitle({
            title:"探索页面"
        });
        var that = this;
        this.reqData(1);
    },

    reqData: function(typeId) { // 模拟请求数据
        // TODO: 请求分类typeId的餐品列表数据
        // 模拟
        var dishes = [];
        for (var i = 0; i < 10; i ++) {
            dishes.push({
                id: typeId + '' + i,
                name: '梅菜扣肉套餐+送酸奶',
                img: '../../res/img/demo.jpg',
                sold: 100,
                price: 20,
                likes: 100
            });
        }

        this.setData({
            dishes: dishes
        });
    },

    chooseType: function(event) {
        var id = event.currentTarget.dataset.id;
        // TODO: request the list of id...
        this.setData({
            chosenType: id
        });

        this.reqData(id);
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

    addToCart: function(event) {
        var id = event.currentTarget.dataset.id;
        console.log('add to cart: ' +  id);

        this.toast('Dish ' + id + ' added to cart.');
        // TODO: do something to add dishes to cart.
    }
})
