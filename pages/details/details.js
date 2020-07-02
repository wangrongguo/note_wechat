// pages/details/details.js
const app = getApp();
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
      na_back: true,
      na_backcolor: na_backcolor,
      na_text: '祺弄便利签'
    },
    html:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.note_id)
    var that =this;
    if(options.note_id){
      var nodeListDate = wx.getStorageSync('nodeListDate');
        for (let index = 0; index < nodeListDate.length; index++) {
          const element = nodeListDate[index];
          if (element.id == options.note_id) {
            that.setData({
              html: element.content
            })
          }
        }
    }else{
      that.setData({
        html: app.globalData.html
      })
    }
  },
 // 返回0
 back(){
   wx.navigateBack({
     delta: 1,
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

  }
})