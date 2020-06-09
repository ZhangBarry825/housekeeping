// pages/publish-task/three/three.js
const api = require('../../../utils/api.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ifShow:false,
    order_id:''
  },
  retrieveData(){
    
    api.post({
      url: `/Order/order_info`,
      data: {
        user_id:wx.getStorageSync('userid'),
        user_token: wx.getStorageSync('token'),
        order_id:this.data.order_id
      },
      success: res => {
        that.setData({
          renlist:res
        })
        console.log(that.data.renlist,"111")
      }
  })
  },
  goToDetail(){
    wx.navigateTo({
      url:'/pages/publish-task/detail/detail'
    })
  },
  checkService(){
    this.setData({
      ifShow:true
    })
  },
  complaint(){
    wx.navigateTo({
      url:'/pages/publish-task/five/five'
    })
  },
  cancelCheck(){
    this.setData({
      ifShow:false
    })
  },
  appendMoney(){
    wx.navigateTo({
      url:'/pages/append/append'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      order_id:options.order_id
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
