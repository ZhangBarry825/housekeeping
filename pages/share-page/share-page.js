// pages/share-page/share-page.js
const api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  fetchData(){
    // wx.request({
    //   // 获取token
    //   url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential',
    //   data: {
    //     appid: api.AppID,  // 小程序appid
    //     secret: api.AppSecret // 小程序秘钥
    //   },
    //   success(res) {
    //     // res.data.access_token
    //     wx.request({
    //       url: 'https://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode?access_token=' + res.data.access_token,
    //       method: 'POST',
    //       data: {
    //         'path': "/pages/index/index",
    //         "width": 430
    //       },
    //       success(res) {
    //         console.log(res.data)
    //         // 后台转二进制流，后台获取后，直接保存为图片，然后将图片路径返回给前台
    //         // 前端转，如上
    //       }
    //     })
    //   }
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchData()
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