// 查看事件文档https://developers.weixin.qq.com/miniprogram/dev/api/media/editor/EditorContext.html
const util = require('../../utils/util.js');
const app = getApp();
const na_backcolor = app.data.na_backcolor; //颜色
Page({
  data: {
    formats: {},
    bottom: 0,
    readOnly: false,
    placeholder: '介绍一下你的详情吧，支持文字和图片...',
    _focus: false,
    na_tabbar: {
      na_loading: false,
      na_show: true,
      na_animated: true,
      na_back: true,
      na_backcolor: na_backcolor,
      na_text: '祺弄便利签'
    }
  },
  readOnlyChange() {
    this.setData({
      readOnly: !this.data.readOnly
    })
  },
  onLoad() {

  },
  // 编辑器初始化完成时触发
  onEditorReady() {
    const that = this;
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context;
    }).exec();
  },
  undo() {
    this.editorCtx.undo();
  },
  redo() {
    this.editorCtx.redo();
  },
  format(e) {
    let {
      name,
      value
    } = e.target.dataset;
    if (!name) return;
    // console.log('format', name, value)
    this.editorCtx.format(name, value);
  },
  // 通过 Context 方法改变编辑器内样式时触发，返回选区已设置的样式
  onStatusChange(e) {
    const formats = e.detail;
    this.setData({
      formats
    });
  },
  // 插入分割线
  insertDivider() {
    this.editorCtx.insertDivider({
      success: function () {
        console.log('insert divider success')
      }
    });
  },
  // 清除
  clear() {
    this.editorCtx.clear({
      success: function (res) {
        console.log("clear success")
      }
    });
  },
  // 移除样式
  removeFormat() {
    this.editorCtx.removeFormat();
  },
  // 插入当前日期
  insertDate() {
    const date = new Date()
    const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    this.editorCtx.insertText({
      text: formatDate
    });
  },
  // 插入图片
  insertImage() {
    wx.chooseImage({
      count: 1,
      success: () => {
        this.editorCtx.insertImage({
          src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543767268337&di=5a3bbfaeb30149b2afd33a3c7aaa4ead&imgtype=0&src=http%3A%2F%2Fimg02.tooopen.com%2Fimages%2F20151031%2Ftooopen_sy_147004931368.jpg',
          width: '100%',
          data: {
            id: 'abcd',
            role: 'god'
          },
          success: () => {
            console.log('insert image success')
          }
        })
      }
    });
  },
  //选择图片
  chooseImage(e) {
    wx.chooseImage({
      sizeType: ['original', 'compressed'], //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        const images = this.data.images.concat(res.tempFilePaths);
        this.data.images = images.length <= 3 ? images : images.slice(0, 3);
      }
    })
  },
  //查看详细页面
  toDeatil() {
    this.editorCtx.getContents({
      success: (res) => {
        console.log(res.html)
        app.globalData.html = res.html
        wx.navigateTo({
          url: '../details/details'
        })

      },
      fail: (res) => {
        console.log("fail：", res);
      }
    });
  },
  addNode: function(){
    this.editorCtx.getContents({
      success: (res) => {
        console.log(res)
        var nodeListDate = {
          id:new Date().getTime(),
          title:res.text.length >= 10 ? res.text.substring(0,10)+'...' : res.text,
          content:res.html,
          create_time:util.formatTime(new Date()),
          is_show: true
        }
        var nld = wx.getStorageSync('nodeListDate');
        console.log(nld);
        if(nld == ""){
          nld = [];
        }
        nld.unshift(nodeListDate);
        wx.setStorageSync('nodeListDate', nld);
        wx.navigateBack({
          delta: 1,
        })
      },
      fail: (res) => {
        console.log("fail：", res);
      }
    });
  },
  //getAccessToken
  getAccessToken() {
    //请求列表数据
    wx.showLoading({
      title: '加载中...',
    });
    wx.request({
      url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxacf6bd9a000622d6&secret=35427c28fa07ef9040e0de7a4c93bd74', // 仅为示例，并非真实的接口地址
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值application/json
      },
      success(res) {
        console.log(res.data);
        if(res.statusCode == 200){
          wx.request({
            url: 'https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token='+res.data.access_token, // 仅为示例，并非真实的接口地址
            data: {},
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值application/json
            },
            success(res) {
              console.log(res.data);
              if(res.statusCode == 200){
                statusCode
              }
            },
            fail(res) {
              console.log("fail-->"+res);
            },
            complete(res) {
              console.log(res);
              wx.hideLoading();
            }
          });
        }
      },
      fail(res) {
        console.log("fail-->"+res);
      },
      complete(res) {
        console.log(res);
        wx.hideLoading();
      }
    });

  },
  bindGetUserInfo(){
    var code = wx.getStorageSync('code');
    wx.request({
      url: 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=wxc1602247e1311917&secret=f5738c4eab3c7bb72511c7f62b9dec05&code='+code+'&grant_type=authorization_code', // 仅为示例，并非真实的接口地址
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值application/json
      },
      success(res) {
        console.log(res.data);
        if(res.statusCode == 200){
          
        }
      },
      fail(res) {
        console.log("fail-->"+res);
      },
      complete(res) {
        console.log(res);
        wx.hideLoading();
      }
    });
  }
})