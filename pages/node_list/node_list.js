// pages/node_list/node_list.js
const util = require('../../utils/util.js');
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
      na_text: '祺弄便利签'
    },
    //滑动按钮
    slideButtons: [{
      type: 'info',
      text: '置顶',
      src: '../../image/zhiding.svg'
    }, {
      type: 'info',
      text: '完成',
      extClass: 'test',
      src: '../../image/wancheng.svg'
    }, {
      type: 'warn',
      text: '删除',
      extClass: 'test',
      src: '../../image/icon_del.svg'
    }],
    nodeListDate: [],
    x: 100,
    y: 100,
    dialogShow: false,
    showOneButtonDialog: false,
    buttons: [{
      text: '取消'
    }, {
      text: '确定'
    }],
    oneButton: [{
      text: '不在提醒'
    }],
    isShowFinish: false
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
    //第一次加载
    var first_data = wx.getStorageSync('first');
    console.log(first_data)
    console.log(!first_data)
    if (first_data == "") {
      this.setData({
        showOneButtonDialog: true
      });
      wx.setStorageSync('first', true);
      var nodeListDate = {
        id: new Date().getTime(),
        title: "示例（左滑可操作删除）",
        content: '<p wx:nodeid="61">声明：</p><ol wx:nodeid="92"><li wx:nodeid="96">不记录不存储用户信息</li><li wx:nodeid="109">只缓存在手机本地</li><li wx:nodeid="121">删除小程序或者清理缓存则数据自动清空</li><li wx:nodeid="131">更换手机登录数据不同步</li></ol><p wx:nodeid="136">功能介绍：</p><ol wx:nodeid="167"><li wx:nodeid="173">添加有格式的文本</li><li wx:nodeid="174">可查看详情</li><li wx:nodeid="175">滑动可操作置顶、完成、删除</li><li wx:nodeid="176">已完成可隐藏/显示</li></ol>',
        create_time: util.formatTime(new Date()),
        is_show: true
      }
      var nld = wx.getStorageSync('nodeListDate');
      console.log(nld);
      if (nld == "") {
        nld = [];
        nld.push(nodeListDate);
        wx.setStorageSync('nodeListDate', nld);
      }
    }
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
    var nodeListDate = wx.getStorageSync('nodeListDate');
    var that = this;
    this.setData({
      nodeListDate: nodeListDate
    })
    wx.getSystemInfo({
      success: (result) => {
        console.log(result)
        that.setData({
          x: result.windowWidth,
          y: result.windowHeight / 2
        })

      },
    })
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
  slideButtonTap: function (e) {
    console.log('slide button tap', e)
    console.log(e.target.dataset.id)
    var nodeListDate = wx.getStorageSync('nodeListDate');
    var nodeListDateNew = wx.getStorageSync('nodeListDate');
    //删除
    if (e.detail.index == 2) {
      for (let index = 0; index < nodeListDate.length; index++) {
        const element = nodeListDate[index];
        if (element.id == e.target.dataset.id) {
          nodeListDateNew.splice(index, 1)
        }
      }

    } else if (e.detail.index == 0) {
      //置顶
      for (let index = 0; index < nodeListDate.length; index++) {
        const element = nodeListDate[index];
        if (element.id == e.target.dataset.id && element.is_show) {
          nodeListDateNew.splice(index, 1)
          nodeListDateNew.unshift(element)
        }
      }

    } else if (e.detail.index == 1) {
      //完成
      for (let index = 0; index < nodeListDate.length; index++) {
        const element = nodeListDate[index];
        if (element.id == e.target.dataset.id && element.is_show) {
          nodeListDateNew.splice(index, 1)
          element.is_show = false;
          nodeListDateNew.push(element)
        }
      }
    }
    wx.setStorageSync('nodeListDate', nodeListDateNew)
    this.setData({
      nodeListDate: nodeListDateNew
    })
  },
  /**
   * 添加便签
   */
  addNode: function () {
    wx.navigateTo({
      url: '../index/index',
      fail: function (e) {
        console.log(e)
        wx.redirectTo({
          url: '../index/index',
        })
      }
    })
  },
  tapDialogButton(e) {
    this.setData({
      dialogShow: false,
      showOneButtonDialog: false
    })
  },
  isShowFinish: function () {
    //显示隐藏已完成
    if (this.data.isShowFinish) {
      this.setData({
        isShowFinish: false
      })
    } else {
      this.setData({
        isShowFinish: true
      })
    }
  }
})