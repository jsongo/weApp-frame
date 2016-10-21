
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

      chosenType: 1,
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
      }]
  },
  onLoad: function () {
      console.log('onLoad');
      wx.setNavigationBarTitle({
          title:"探索页面"
      })
  },
  chooseType: function(event) {
      var id = event.currentTarget.dataset.id;
      // TODO: request the list of id...
      this.setData({
          chosenType: id
      });
  },
  addToCart: function(event) {
      var id = event.currentTarget.dataset.id;
      console.log('add to cart: ' +  id);
  }
})
