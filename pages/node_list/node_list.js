// pages/node_list/node_list.js
const app = getApp()
const na_backcolor = app.data.na_backcolor; //颜色
Page({

  /**
   * 页面的初始数据
   */
  data: {
    na_tabbar: {
      na_loading: false,
      na_show: true,
      na_animated: true,
      na_back: false,
      na_backcolor: na_backcolor,
      na_text: '给明天'
    },
    //滑动按钮
    slideButtons: [{
      type: 'info',
      text: '完成',
      src: '../../image/icon_love.svg'
    }, {
      type: 'info',
      text: '修改',
      extClass: 'test',
      src: '../../image/icon_star.svg'
    }, {
      type: 'warn',
      text: '删除',
      extClass: 'test',
      src: '../../image/icon_del.svg'
    }],
    nodeListDate:[]
  },

  /**
   * 生命周期函数--监听页面加载
   * {
        id:"",
        title:"7月1日计划",
        content:"",
        create_time:"2020-07-01 18:12"
      }
   */
  onLoad: function (options) {
    var nodeListDate = wx.getStorageSync('nodeListDate');
    this.setData({
      nodeListDate:nodeListDate
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 滑动点击事件
   */
  slideButtonTap: function(e) {
    console.log('slide button tap', e)
    console.log(e.target.dataset.id)
    var nodeListDate = wx.getStorageSync('nodeListDate');
    var nodeListDateNew = wx.getStorageSync('nodeListDate');
    for (let index = 0; index < nodeListDate.length; index++) {
      const element = nodeListDate[index];
      if(element.id == e.target.dataset.id){
        nodeListDateNew.splice(index,1)
      }
    }
    wx.setStorageSync('nodeListDate', nodeListDateNew)
    this.setData({
      nodeListDate:nodeListDateNew
    })
  },
  /**
   * 添加便签
   */
  addNode: function(){
    wx.navigateTo({
      url: '../index/index',
    })
  }
})